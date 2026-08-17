/* ==========================================================================
   360 tour data. One self-contained tour per pod style, keyed by the slug
   used in /tour.html?pod=<slug>. Panoramas live in assets/tours/.

   All angles are in DEGREES for easy fine-tuning:
     yaw:   0 = centre of the panorama image, positive = right, range -180..180
     pitch: 0 = horizon, positive = up
   entryYaw/entryPitch set the view when arriving at a node. Aim these along
   the direction of travel, not the stitch line.
   ========================================================================== */

export const TOURS = {
  'king-twin': {
    label: 'King + Twin',
    startNodeId: 'shrew-008',
    nodes: [
      {
        id: 'shrew-008',
        panorama: 'assets/tours/shrew-008.jpg',
        name: 'Approach',
        entryYaw: -5,
        links: [{ nodeId: 'shrew-009', yaw: -5, pitch: -3 }],
      },
      {
        id: 'shrew-009',
        panorama: 'assets/tours/shrew-009.jpg',
        name: 'Patio & Hot Tub',
        entryYaw: 0,
        links: [
          { nodeId: 'shrew-010', yaw: 0, pitch: -5 },
          { nodeId: 'shrew-008', yaw: 175 },
        ],
      },
      {
        id: 'shrew-010',
        panorama: 'assets/tours/shrew-010.jpg',
        name: 'King Living Space',
        entryYaw: -60,
        links: [
          { nodeId: 'shrew-011', yaw: -61 },
          { nodeId: 'shrew-009', yaw: 108 },
        ],
      },
      {
        id: 'shrew-011',
        panorama: 'assets/tours/shrew-011.jpg',
        name: 'Hallway',
        entryYaw: 20,
        links: [
          { nodeId: 'shrew-013', yaw: 11 },
          { nodeId: 'shrew-012', yaw: 72 },
          { nodeId: 'shrew-010', yaw: 144 },
        ],
      },
      {
        id: 'shrew-012',
        panorama: 'assets/tours/shrew-012.jpg',
        name: 'Twin Bedroom',
        entryYaw: 18,
        links: [{ nodeId: 'shrew-011', yaw: -126 }],
      },
      {
        id: 'shrew-013',
        panorama: 'assets/tours/shrew-013.jpg',
        name: 'Shower Room',
        entryYaw: 72,
        links: [{ nodeId: 'shrew-011', yaw: -144 }],
      },
    ],
  },

  'king-single-bunk': {
    label: 'King, Single + Bunk',
    startNodeId: 'bittern-024',
    nodes: [
      {
        id: 'bittern-024',
        panorama: 'assets/tours/bittern-024.jpg',
        name: 'Approach',
        entryYaw: 68,
        links: [{ nodeId: 'bittern-025', yaw: 68, pitch: -3 }],
      },
      {
        id: 'bittern-025',
        panorama: 'assets/tours/bittern-025.jpg',
        name: 'Patio & Hot Tub',
        entryYaw: 137,
        links: [
          { nodeId: 'bittern-026', yaw: 137, pitch: -5 },
          { nodeId: 'bittern-024', yaw: -29 },
        ],
      },
      {
        id: 'bittern-026',
        panorama: 'assets/tours/bittern-026.jpg',
        name: 'King Living Space',
        entryYaw: 40,
        links: [
          { nodeId: 'bittern-027', yaw: -29 },
          { nodeId: 'bittern-025', yaw: -126 },
        ],
      },
      {
        id: 'bittern-027',
        panorama: 'assets/tours/bittern-027.jpg',
        name: 'Kitchen',
        entryYaw: 0,
        links: [
          { nodeId: 'bittern-028', yaw: 90 },
          { nodeId: 'bittern-029', yaw: 126 },
          { nodeId: 'bittern-026', yaw: -144 },
        ],
      },
      {
        id: 'bittern-028',
        panorama: 'assets/tours/bittern-028.jpg',
        name: 'Shower Room',
        entryYaw: 18,
        links: [{ nodeId: 'bittern-027', yaw: 108 }],
      },
      {
        id: 'bittern-029',
        panorama: 'assets/tours/bittern-029.jpg',
        name: 'Single & Bunk Room',
        entryYaw: -108,
        links: [
          { nodeId: 'bittern-030', yaw: -162, pitch: -10 },
          { nodeId: 'bittern-027', yaw: 100 },
        ],
      },
      {
        id: 'bittern-030',
        panorama: 'assets/tours/bittern-030.jpg',
        name: 'Bunk Beds',
        entryYaw: -108,
        links: [{ nodeId: 'bittern-029', yaw: 169 }],
      },
    ],
  },

  'king-bunk': {
    label: 'King + Bunk',
    startNodeId: 'coot-014',
    nodes: [
      {
        id: 'coot-014',
        panorama: 'assets/tours/coot-014.jpg',
        name: 'Approach',
        entryYaw: -11,
        links: [{ nodeId: 'coot-015', yaw: -11, pitch: -3 }],
      },
      {
        id: 'coot-015',
        panorama: 'assets/tours/coot-015.jpg',
        name: 'Decking & Hot Tub',
        entryYaw: 151,
        links: [
          { nodeId: 'coot-016', yaw: 151, pitch: -5 },
          { nodeId: 'coot-014', yaw: 0 },
        ],
      },
      {
        id: 'coot-016',
        panorama: 'assets/tours/coot-016.jpg',
        name: 'King Living Space',
        entryYaw: 180,
        links: [
          { nodeId: 'coot-017', yaw: -162 },
          { nodeId: 'coot-015', yaw: 0 },
        ],
      },
      {
        id: 'coot-017',
        panorama: 'assets/tours/coot-017.jpg',
        name: 'Kitchen',
        entryYaw: 0,
        links: [
          { nodeId: 'coot-018', yaw: 133 },
          { nodeId: 'coot-019', yaw: -170 },
          { nodeId: 'coot-020', yaw: -10, pitch: -25 },
          { nodeId: 'coot-016', yaw: 72 },
        ],
      },
      {
        id: 'coot-018',
        panorama: 'assets/tours/coot-018.jpg',
        name: 'Shower Room',
        entryYaw: -90,
        links: [{ nodeId: 'coot-017', yaw: 0 }],
      },
      {
        id: 'coot-019',
        panorama: 'assets/tours/coot-019.jpg',
        name: 'Bunk Beds',
        entryYaw: 155,
        links: [{ nodeId: 'coot-017', yaw: -29 }],
      },
      {
        id: 'coot-020',
        panorama: 'assets/tours/coot-020.jpg',
        name: 'Kitchen Storage',
        entryYaw: -144,
        entryPitch: -15,
        links: [{ nodeId: 'coot-017', yaw: -36, pitch: 10 }],
      },
    ],
  },

  'broad-fen': {
    label: 'Broad Fen King Pod',
    startNodeId: 'broadfen-006',
    nodes: [
      {
        id: 'broadfen-006',
        panorama: 'assets/tours/broadfen-006.jpg',
        name: 'Patio & Hot Tub',
        entryYaw: 0,
        links: [{ nodeId: 'broadfen-002', yaw: 0, pitch: -5 }],
      },
      {
        id: 'broadfen-002',
        panorama: 'assets/tours/broadfen-002.jpg',
        name: 'Living Area',
        entryYaw: -60,
        links: [
          { nodeId: 'broadfen-003', yaw: -100 },
          { nodeId: 'broadfen-006', yaw: 126, pitch: -10 },
        ],
      },
      {
        id: 'broadfen-003',
        panorama: 'assets/tours/broadfen-003.jpg',
        name: 'Kitchen',
        entryYaw: -18,
        links: [
          { nodeId: 'broadfen-004', yaw: -18 },
          { nodeId: 'broadfen-005', yaw: 36 },
          { nodeId: 'broadfen-002', yaw: 126 },
        ],
      },
      {
        id: 'broadfen-004',
        panorama: 'assets/tours/broadfen-004.jpg',
        name: 'Bathroom',
        entryYaw: 60,
        links: [{ nodeId: 'broadfen-003', yaw: -126 }],
      },
      {
        id: 'broadfen-005',
        panorama: 'assets/tours/broadfen-005.jpg',
        name: 'King Bedroom',
        entryYaw: -144,
        links: [{ nodeId: 'broadfen-003', yaw: 47 }],
      },
    ],
  },

  'canoe-hire': {
    label: 'Canoe Hire Base',
    startNodeId: 'canoe-hire-001',
    nodes: [
      {
        id: 'canoe-hire-001',
        panorama: 'assets/tours/canoe-hire-001.jpg',
        name: 'Riverside Base',
        entryYaw: -30,
        links: [],
      },
    ],
  },
}
