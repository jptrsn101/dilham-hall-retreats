/* 360 tour viewer page (tour.html?pod=<slug>). Self-hosted Photo Sphere
   Viewer, vendored in assets/vendor/psv/ to satisfy the site CSP. */

import { Viewer } from '../vendor/psv/core.module.js'
import { VirtualTourPlugin } from '../vendor/psv/virtual-tour.module.js'
import { TOURS } from './tour-data.js'

const degToRad = (deg) => (deg * Math.PI) / 180

const params = new URLSearchParams(window.location.search)
// Accept /tour?pod=<slug> or /tour#<slug>
const slug = params.get('pod') || window.location.hash.replace('#', '')
const tour = TOURS[slug]
const container = document.getElementById('viewer')

if (!tour) {
  const list = Object.keys(TOURS)
    .map((key) => `<li><a href="/tour?pod=${key}">${TOURS[key].label}</a></li>`)
    .join('')
  container.innerHTML = `<div class="tour-missing"><p>Choose a tour:</p><ul>${list}</ul></div>`
} else {
  document.title = `${tour.label} | 360° Tour | Dilham Hall Retreats`

  const entryViews = new Map(
    tour.nodes.map((node) => [
      node.id,
      {
        yaw: degToRad(node.entryYaw || 0),
        pitch: degToRad(node.entryPitch || 0),
      },
    ])
  )
  const startView = entryViews.get(tour.startNodeId)

  new Viewer({
    container,
    loadingTxt: 'Loading tour…',
    defaultYaw: startView ? startView.yaw : 0,
    defaultPitch: startView ? startView.pitch : 0,
    minFov: 30,
    maxFov: 90,
    // Start fully zoomed out (0 = widest field of view)
    defaultZoomLvl: 0,
    // Single-finger pan + pinch zoom on mobile, no gyro required
    touchmoveTwoFingers: false,
    navbar: ['zoom', 'move', 'caption', 'fullscreen'],
    plugins: [
      [
        VirtualTourPlugin,
        {
          positionMode: 'manual',
          renderMode: '3d',
          // Only panoramas linked from the current node are preloaded
          preload: true,
          startNodeId: tour.startNodeId,
          // On node entry, face the direction of travel and reset the zoom
          transitionOptions: (toNode) => ({
            speed: '20rpm',
            effect: 'fade',
            rotation: true,
            rotateTo: entryViews.get(toNode.id),
            zoomTo: 0,
          }),
          nodes: tour.nodes.map((node) => ({
            id: node.id,
            panorama: node.panorama,
            name: node.name,
            caption: `${tour.label} · ${node.name}`,
            links: node.links.map((link) => ({
              nodeId: link.nodeId,
              position: {
                yaw: degToRad(link.yaw),
                pitch: degToRad(link.pitch || 0),
              },
            })),
          })),
        },
      ],
    ],
  })
}
