/**
 * 预设数据格式
 * @type {{}}
 */

const preset1 = {
  "GG":
    [{"id": 0, "prop": {"gender": "U"}}
    ],
  "ranks": [3],
  "order": [[], [], [], [0]],
  "positions": [5]
};

const preset2 = {
  "GG": [
    {"id": 0, "prop": {"gender": "U"}},
    {"id": 1, "chhub": true, "prop": {}, "outedges": [{"to": 0}]},
    {"id": 2, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 1}]},
    {"id": 3, "prop": {"gender": "F"}, "outedges": [{"to": 2}]},
    {"id": 4, "prop": {"gender": "M"}, "outedges": [{"to": 2}]}
  ],
  "ranks": [3, 2, 1, 1, 1],
  "order": [
    [],
    [4, 2, 3],
    [1],
    [0]
  ],
  "positions": [5, 5, 5, 17, -7]
};

const preset3 = {
  "GG": [
    {"id": 0, "prop": {"gender": "U"}},
    {"id": 1, "chhub": true, "prop": {}, "outedges": [{"to": 0}]},
    {"id": 2, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 1}]},
    {"id": 3, "prop": {"gender": "F"}, "outedges": [{"to": 2}]},
    {"id": 4, "prop": {"gender": "M"}, "outedges": [{"to": 2}]},
    {"id": 5, "chhub": true, "prop": {}, "outedges": [{"to": 4}]},
    {"id": 6, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 5}]},
    {"id": 7, "prop": {"gender": "F"}, "outedges": [{"to": 6}]},
    {"id": 8, "prop": {"gender": "M"}, "outedges": [{"to": 6}]},
    {"id": 9, "chhub": true, "prop": {}, "outedges": [{"to": 3}]},
    {"id": 10, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 9}]},
    {"id": 11, "prop": {"gender": "F"}, "outedges": [{"to": 10}]},
    {"id": 12, "prop": {"gender": "M"}, "outedges": [{"to": 10}]}
    ],
  "ranks": [5, 4, 3, 3, 3, 2, 1, 1, 1, 2, 1, 1, 1],
  "order": [
    [],
    [8, 6, 7, 12, 10, 11],
    [5, 9],
    [4, 2, 3],
    [1], [0]
  ],
  "positions": [15, 15, 15, 37, -7, -7, -7, 5, -19, 37, 37, 49, 25]
};

const preset4 = {
  "GG": [{"id": 0, "prop": {"gender": "U"}}, {
    "id": 1,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 0}]
  }, {"id": 2, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 1}]}, {
    "id": 3,
    "prop": {"gender": "F"},
    "outedges": [{"to": 2}]
  }, {"id": 4, "prop": {"gender": "M"}, "outedges": [{"to": 2}]}, {
    "id": 5,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 4}]
  }, {"id": 6, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 5}]}, {
    "id": 7,
    "prop": {"gender": "F"},
    "outedges": [{"to": 6}]
  }, {"id": 8, "prop": {"gender": "M"}, "outedges": [{"to": 6}]}, {
    "id": 9,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 3}]
  }, {"id": 10, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 9}]}, {
    "id": 11,
    "prop": {"gender": "F"},
    "outedges": [{"to": 10}]
  }, {"id": 12, "prop": {"gender": "M"}, "outedges": [{"to": 10}]}, {
    "id": 13,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 8}]
  }, {"id": 14, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 13}]}, {
    "id": 15,
    "prop": {"gender": "F"},
    "outedges": [{"to": 14}]
  }, {"id": 16, "prop": {"gender": "M"}, "outedges": [{"to": 14}]}, {
    "id": 17,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 7}]
  }, {"id": 18, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 17}]}, {
    "id": 19,
    "prop": {"gender": "F"},
    "outedges": [{"to": 18}]
  }, {"id": 20, "prop": {"gender": "M"}, "outedges": [{"to": 18}]}, {
    "id": 21,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 12}]
  }, {"id": 22, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 21}]}, {
    "id": 23,
    "prop": {"gender": "F"},
    "outedges": [{"to": 22}]
  }, {"id": 24, "prop": {"gender": "M"}, "outedges": [{"to": 22}]}, {
    "id": 25,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 11}]
  }, {"id": 26, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 25}]}, {
    "id": 27,
    "prop": {"gender": "F"},
    "outedges": [{"to": 26}]
  }, {"id": 28, "prop": {"gender": "M"}, "outedges": [{"to": 26}]}],
  "ranks": [7, 6, 5, 5, 5, 4, 3, 3, 3, 4, 3, 3, 3, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1],
  "order": [[], [16, 14, 15, 20, 18, 19, 24, 22, 23, 28, 26, 27], [13, 17, 21, 25], [8, 6, 7, 12, 10, 11], [5, 9], [4, 2, 3], [1], [0]],
  "positions": [47, 47, 47, 91, 3, 3, 3, 25, -19, 91, 91, 113, 69, -19, -19, -7, -31, 25, 25, 37, 13, 69, 69, 81, 57, 113, 113, 125, 101]
};

const preset5 = {
  "GG": [{"id": 0, "prop": {"gender": "U"}}, {
    "id": 1,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 0}]
  }, {"id": 2, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 1}]}, {
    "id": 3,
    "prop": {"gender": "F"},
    "outedges": [{"to": 2}]
  }, {"id": 4, "prop": {"gender": "M"}, "outedges": [{"to": 2}]}, {
    "id": 5,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 4}]
  }, {"id": 6, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 5}]}, {
    "id": 7,
    "prop": {"gender": "U"},
    "outedges": [{"to": 6}]
  }, {"id": 8, "prop": {"gender": "U"}, "outedges": [{"to": 6}]}, {
    "id": 9,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 3}]
  }, {"id": 10, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 9}]}, {
    "id": 11,
    "prop": {"gender": "U"},
    "outedges": [{"to": 10}]
  }, {"id": 12, "prop": {"gender": "U"}, "outedges": [{"to": 10}]}, {
    "id": 13,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 7}, {"to": 12}]
  }, {"id": 14, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 13}]}, {
    "id": 15,
    "prop": {"gender": "F"},
    "outedges": [{"to": 14}]
  }, {"id": 16, "prop": {"gender": "M"}, "outedges": [{"to": 14}]}],
  "ranks": [7, 6, 5, 5, 5, 4, 3, 3, 3, 4, 3, 3, 3, 2, 1, 1, 1],
  "order": [[], [16, 14, 15], [13], [8, 6, 7, 12, 10, 11], [5, 9], [4, 2, 3], [1], [0]],
  "positions": [39, 39, 39, 61, 17, 17, 17, 29, 5, 61, 61, 73, 49, 39, 39, 51, 27]
};

const preset6 = {
  "GG": [{"id": 0, "prop": {"gender": "U", "fName": "11", "nodeNumber": "IV-1"}}, {
    "id": 1,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 0}]
  }, {"id": 2, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 1}]}, {
    "id": 3,
    "prop": {"gender": "F", "nodeNumber": "III-5"},
    "outedges": [{"to": 2}, {"to": 29}, {"to": 37}, {"to": 41}]
  }, {"id": 4, "prop": {"gender": "M", "nodeNumber": "III-1"}, "outedges": [{"to": 2}]}, {
    "id": 5,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 4}]
  }, {"id": 6, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 5}]}, {
    "id": 7,
    "prop": {"gender": "F", "nodeNumber": "II-2"},
    "outedges": [{"to": 6}]
  }, {"id": 8, "prop": {"gender": "M", "nodeNumber": "II-1"}, "outedges": [{"to": 6}]}, {
    "id": 9,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 3}]
  }, {"id": 10, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 9}]}, {
    "id": 11,
    "prop": {"gender": "F", "nodeNumber": "II-6"},
    "outedges": [{"to": 10}]
  }, {
    "id": 12,
    "prop": {"gender": "M", "nodeNumber": "II-5"},
    "outedges": [{"to": 10}, {"to": 46}, {"to": 50}]
  }, {"id": 13, "chhub": true, "prop": {}, "outedges": [{"to": 8}]}, {
    "id": 14,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 13}]
  }, {"id": 15, "prop": {"gender": "F", "nodeNumber": "I-2"}, "outedges": [{"to": 14}]}, {
    "id": 16,
    "prop": {"gender": "M", "nodeNumber": "I-1"},
    "outedges": [{"to": 14}]
  }, {"id": 17, "chhub": true, "prop": {}, "outedges": [{"to": 7}]}, {
    "id": 18,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 17}]
  }, {"id": 19, "prop": {"gender": "F", "nodeNumber": "I-4"}, "outedges": [{"to": 18}]}, {
    "id": 20,
    "prop": {"gender": "M", "nodeNumber": "I-3"},
    "outedges": [{"to": 18}]
  }, {"id": 21, "chhub": true, "prop": {}, "outedges": [{"to": 12}]}, {
    "id": 22,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 21}]
  }, {"id": 23, "prop": {"gender": "F", "nodeNumber": "I-6"}, "outedges": [{"to": 22}]}, {
    "id": 24,
    "prop": {"gender": "M", "nodeNumber": "I-5"},
    "outedges": [{"to": 22}]
  }, {"id": 25, "chhub": true, "prop": {}, "outedges": [{"to": 11}]}, {
    "id": 26,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 25}]
  }, {"id": 27, "prop": {"gender": "F", "nodeNumber": "I-8"}, "outedges": [{"to": 26}]}, {
    "id": 28,
    "prop": {"gender": "M", "nodeNumber": "I-7"},
    "outedges": [{"to": 26}]
  }, {"id": 29, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 31}]}, {
    "id": 30,
    "prop": {"gender": "M", "nodeNumber": "III-7"},
    "outedges": [{"to": 29}, {"to": 33}]
  }, {"id": 31, "chhub": true, "prop": {}, "outedges": [{"to": 32}]}, {
    "id": 32,
    "prop": {"gender": "U", "nodeNumber": "IV-4"}
  }, {"id": 33, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 35}]}, {
    "id": 34,
    "prop": {"gender": "F", "nodeNumber": "III-8"},
    "outedges": [{"to": 33}]
  }, {"id": 35, "chhub": true, "prop": {}, "outedges": [{"to": 36}, {"to": 45}]}, {
    "id": 36,
    "prop": {"gender": "U", "nodeNumber": "IV-5"}
  }, {"id": 37, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 39}]}, {
    "id": 38,
    "prop": {"gender": "M", "nodeNumber": "III-4"},
    "outedges": [{"to": 37}]
  }, {"id": 39, "chhub": true, "prop": {}, "outedges": [{"to": 40}]}, {
    "id": 40,
    "prop": {"gender": "U", "nodeNumber": "IV-2"}
  }, {"id": 41, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 43}]}, {
    "id": 42,
    "prop": {"gender": "M", "nodeNumber": "III-6"},
    "outedges": [{"to": 41}]
  }, {"id": 43, "chhub": true, "prop": {}, "outedges": [{"to": 44}]}, {
    "id": 44,
    "prop": {"gender": "U", "nodeNumber": "IV-3"}
  }, {"id": 45, "prop": {"gender": "U", "nodeNumber": "IV-6"}}, {
    "id": 46,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 48}]
  }, {"id": 47, "prop": {"gender": "F", "nodeNumber": "II-3"}, "outedges": [{"to": 46}]}, {
    "id": 48,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 49}]
  },
    {"id": 49, "prop": {"gender": "U", "nodeNumber": "III-2"}},
    {
      "id": 50,
      "rel": true,
      "hub": true,
      "prop": {},
      "outedges": [{"to": 52}]
    }, {"id": 51, "prop": {"gender": "F", "nodeNumber": "II-4"}, "outedges": [{"to": 50}]}, {
      "id": 52,
      "chhub": true,
      "prop": {},
      "outedges": [{"to": 53}]
    }, {"id": 53, "prop": {"gender": "U", "nodeNumber": "III-3"}}],
  "ranks": [7, 6, 5, 5, 5, 4, 3, 3, 3, 4, 3, 3, 3, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 5, 5, 6, 7, 5, 5, 6, 7, 5, 5, 6, 7, 5, 5, 6, 7, 7, 3, 3, 4, 5, 3, 3, 4, 5],
  "order": [
    [],
    [16, 14, 15, 20, 18, 19, 24, 22, 23, 28, 26, 27],
    [13, 17, 21, 25],
    [8, 6, 7, 47, 46, 51, 50, 12, 10, 11],
    [5, 48, 52, 9],
    [4, 2, 49, 53, 38, 37, 3, 41, 42, 29, 30, 33, 34],
    [1, 39, 43, 31, 35],
    [0, 40, 44, 32, 36, 45]
  ],
  "positions": [43, 43, 43, 121, 3, 3, 3, 25, -19, 121, 121, 133, 93, -19, -19, -7, -31, 25, 25, 37, 13, 89, 89, 101, 77, 133, 133, 145, 121, 157, 175, 157, 157, 187, 199, 187, 177, 109, 97, 109, 109, 133, 145, 133, 133, 197, 57, 45, 57, 57, 81, 69, 81, 77]
};

const preset7 = {
  "GG": [{"id": 0, "prop": {"gender": "U", "nodeNumber": "IV-1"}}, {
    "id": 1,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 0}]
  }, {"id": 2, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 1}]}, {
    "id": 3,
    "prop": {"gender": "F", "nodeNumber": "III-3"},
    "outedges": [{"to": 2}]
  }, {"id": 4, "prop": {"gender": "M", "nodeNumber": "III-1"}, "outedges": [{"to": 2}]}, {
    "id": 5,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 4}]
  }, {"id": 6, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 5}]}, {
    "id": 7,
    "prop": {"gender": "U", "nodeNumber": "II-2"},
    "outedges": [{"to": 6}]
  }, {"id": 8, "prop": {"gender": "U", "nodeNumber": "II-1"}, "outedges": [{"to": 6}]}, {
    "id": 9,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 3}]
  }, {"id": 10, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 9}]}, {
    "id": 11,
    "prop": {"gender": "U", "nodeNumber": "II-4"},
    "outedges": [{"to": 10}, {"to": 25}]
  }, {
    "id": 12,
    "prop": {"gender": "U", "nodeNumber": "II-5"},
    "outedges": [{"to": 10}, {"to": 17}, {"to": 33}]
  }, {"id": 13, "chhub": true, "prop": {}, "outedges": [{"to": 7}, {"to": 12}]}, {
    "id": 14,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 13}]
  }, {"id": 15, "prop": {"gender": "F", "nodeNumber": "I-4"}, "outedges": [{"to": 14}]}, {
    "id": 16,
    "prop": {"gender": "M", "nodeNumber": "I-3"},
    "outedges": [{"to": 14}]
  }, {"id": 17, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 19}]}, {
    "id": 18,
    "prop": {"gender": "U", "nodeNumber": "II-7"},
    "outedges": [{"to": 17}]
  }, {"id": 19, "chhub": true, "prop": {}, "outedges": [{"to": 20}]}, {
    "id": 20,
    "prop": {"gender": "U", "nodeNumber": "III-5"}
  }, {"id": 21, "chhub": true, "prop": {}, "outedges": [{"to": 11}]}, {
    "id": 22,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 21}]
  }, {"id": 23, "prop": {"gender": "F", "nodeNumber": "I-2"}, "outedges": [{"to": 22}]}, {
    "id": 24,
    "prop": {"gender": "M", "nodeNumber": "I-1"},
    "outedges": [{"to": 22}]
  }, {"id": 25, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 27}]}, {
    "id": 26,
    "prop": {"gender": "U", "nodeNumber": "II-3"},
    "outedges": [{"to": 25}]
  }, {"id": 27, "chhub": true, "prop": {}, "outedges": [{"to": 28}]}, {
    "id": 28,
    "prop": {"gender": "U", "nodeNumber": "III-2"}
  }, {"id": 29, "chhub": true, "prop": {}, "outedges": [{"to": 18}]}, {
    "id": 30,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 29}]
  }, {"id": 31, "prop": {"gender": "F", "nodeNumber": "I-8"}, "outedges": [{"to": 30}]}, {
    "id": 32,
    "prop": {"gender": "M", "nodeNumber": "I-7"},
    "outedges": [{"to": 30}]
  }, {"id": 33, "rel": true, "hub": true, "prop": {}, "outedges": [{"to": 35}]}, {
    "id": 34,
    "prop": {"gender": "U", "nodeNumber": "II-6"},
    "outedges": [{"to": 33}]
  }, {"id": 35, "chhub": true, "prop": {}, "outedges": [{"to": 36}]}, {
    "id": 36,
    "prop": {"gender": "U", "nodeNumber": "III-4"}
  }, {"id": 37, "chhub": true, "prop": {}, "outedges": [{"to": 34}]}, {
    "id": 38,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 37}]
  }, {"id": 39, "prop": {"gender": "F", "nodeNumber": "I-6"}, "outedges": [{"to": 38}]}, {
    "id": 40,
    "prop": {"gender": "M", "nodeNumber": "I-5"},
    "outedges": [{"to": 38}]
  }],
  "ranks": [7, 6, 5, 5, 5, 4, 3, 3, 3, 4, 3, 3, 3, 2, 1, 1, 1, 3, 3, 4, 5, 2, 1, 1, 1, 3, 3, 4, 5, 2, 1, 1, 1, 3, 3, 4, 5, 2, 1, 1, 1],
  "order": [[], [24, 22, 23, 16, 14, 15, 40, 38, 39, 32, 30, 31], [21, 13, 37, 29], [8, 6, 7, 26, 25, 11, 10, 12, 33, 34, 17, 18], [5, 27, 9, 35, 19], [4, 2, 28, 3, 36, 20], [1], [0]],
  "positions": [36, 36, 36, 87, 18, 18, 18, 31, 5, 87, 87, 75, 99, 95, 95, 107, 83, 151, 183, 151, 151, 51, 51, 63, 39, 63, 51, 63, 63, 183, 183, 195, 171, 119, 139, 119, 119, 139, 139, 151, 127]
}

const preset8 = {
  "GG": [{"id": 0, "prop": {"gender": "U"}, "outedges": [{"to": 1}, {"to": 6}]}, {
    "id": 1,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 3}]
  }, {"id": 2, "prop": {"gender": "U"}, "outedges": [{"to": 1}]}, {
    "id": 3,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 4}, {"to": 5}]
  }, {"id": 4, "prop": {"gender": "F"}}, {"id": 5, "prop": {"gender": "M", "numPersons": 4}}, {
    "id": 6,
    "rel": true,
    "hub": true,
    "prop": {},
    "outedges": [{"to": 8}]
  }, {"id": 7, "prop": {"gender": "U"}, "outedges": [{"to": 6}]}, {
    "id": 8,
    "chhub": true,
    "prop": {},
    "outedges": [{"to": 9}, {"to": 10}, {"to": 11}]
  }, {"id": 9, "prop": {"gender": "U", "twinGroup": 0}}, {"id": 10, "prop": {"gender": "U", "twinGroup": 0}}, {
    "id": 11,
    "prop": {"gender": "U", "twinGroup": 0}
  }],
  "ranks": [3, 3, 3, 4, 5, 5, 3, 3, 4, 5, 5, 5],
  "order": [[], [], [], [7, 6, 0, 1, 2], [8, 3], [9, 10, 11, 4, 5]],
  "positions": [5, 41, 53, 41, 31, 51, -7, -19, -7, -25, -7, 11]
};

//const preset9 = {"GG":[{"id":0,"prop":{"gender":"U"},"outedges":[{"to":1}]},{"id":1,"rel":true,"hub":true,"prop":{},"outedges":[{"to":3}]},{"id":2,"prop":{"gender":"M"},"outedges":[{"to":1},{"to":5}]},{"id":3,"chhub":true,"prop":{},"outedges":[{"to":4}]},{"id":4,"prop":{"gender":"F"},"outedges":[{"to":9}]},{"id":5,"rel":true,"hub":true,"prop":{},"outedges":[{"to":7}]},{"id":6,"prop":{"gender":"M"},"outedges":[{"to":5}]},{"id":7,"chhub":true,"prop":{},"outedges":[{"to":8}]},{"id":8,"prop":{"gender":"F"}},{"id":9,"rel":true,"hub":true,"prop":{},"outedges":[{"to":11}]},{"id":10,"prop":{"gender":"M"},"outedges":[{"to":9},{"to":17}]},{"id":11,"chhub":true,"prop":{},"outedges":[{"to":12}]},{"id":12,"prop":{"gender":"F"}},{"id":13,"chhub":true,"prop":{},"outedges":[{"to":6}]},{"id":14,"rel":true,"hub":true,"prop":{},"outedges":[{"to":13}]},{"id":15,"prop":{"gender":"F"},"outedges":[{"to":14}]},{"id":16,"prop":{"gender":"M"},"outedges":[{"to":14}]},{"id":17,"rel":true,"hub":true,"prop":{},"outedges":[{"to":19}]},{"id":18,"prop":{"gender":"M"},"outedges":[{"to":17}]},{"id":19,"chhub":true,"prop":{},"outedges":[{"to":20}]},{"id":20,"prop":{"gender":"F"},"outedges":[{"to":21}]},{"id":21,"rel":true,"hub":true,"prop":{},"outedges":[{"to":23}]},{"id":22,"prop":{"gender":"M"},"outedges":[{"to":21},{"to":25}]},{"id":23,"chhub":true,"prop":{},"outedges":[{"to":24}]},{"id":24,"prop":{"gender":"F"}},{"id":25,"rel":true,"hub":true,"prop":{},"outedges":[{"to":27}]},{"id":26,"prop":{"gender":"M"},"outedges":[{"to":25}]},{"id":27,"chhub":true,"prop":{},"outedges":[{"to":28}]},{"id":28,"prop":{"gender":"F"}}],"order":[[],[16,14,15],[13],[0,1,2,5,6],[3,7],[4,9,10,17,18,8],[11,19],[12,20,21,22,25,26],[23,27],[24,28]],"ranks":[3,3,3,4,5,3,3,4,5,5,5,6,7,2,1,1,1,5,5,6,7,7,7,8,9,7,7,8,9],"positionByOrder":[[],[89,101,113],[101],[5,17,29,89,101],[17,89],[17,29,41,53,65,89],[29,53],[29,53,65,77,89,101],[65,89],[65,89]],"positions":[5,17,29,17,17,89,101,89,89,29,41,29,29,101,101,113,89,53,65,53,53,65,77,65,65,89,101,89,89]}

// const preset9 = {"GG":[{"id":0,"prop":{"gender":"U"}},{"id":1,"chhub":true,"prop":{},"outedges":[{"to":0}]},{"id":2,"rel":true,"hub":true,"prop":{},"outedges":[{"to":1}]},{"id":3,"prop":{"gender":"F"},"outedges":[{"to":2},{"to":5}]},{"id":4,"prop":{"gender":"M"},"outedges":[{"to":2}]},{"id":5,"rel":true,"hub":true,"prop":{},"outedges":[{"to":7}]},{"id":6,"prop":{"gender":"M"},"outedges":[{"to":5}]},{"id":7,"chhub":true,"prop":{},"outedges":[{"to":8}]},{"id":8,"prop":{"gender":"F"}}],"order":[[],[4,2,3,5,6],[1,7],[0,8]],"ranks":[3,2,1,1,1,1,1,2,3],"positionByOrder":[[],[-7,5,17,29,41],[5,29],[5,29]],"positions":[5,5,5,17,-7,29,41,29,29]}
const preset9 = {"GG":[{"id":0,"prop":{"gender":"U"},"outedges":[{"to":1},{"to":5},{"to":9}]},{"id":1,"rel":true,"hub":true,"prop":{"relation":1},"outedges":[{"to":3}]},{"id":2,"prop":{"gender":"M"},"outedges":[{"to":1}]},{"id":3,"chhub":true,"prop":{},"outedges":[{"to":4}]},{"id":4,"prop":{"gender":"F"}},{"id":5,"rel":true,"hub":true,"prop":{"relation":1},"outedges":[{"to":7}]},{"id":6,"prop":{"gender":"M"},"outedges":[{"to":5}]},{"id":7,"chhub":true,"prop":{},"outedges":[{"to":8}]},{"id":8,"prop":{"gender":"F"}},{"id":9,"rel":true,"hub":true,"prop":{"relation":1},"outedges":[{"to":11}]},{"id":10,"prop":{"gender":"M"},"outedges":[{"to":9}]},{"id":11,"chhub":true,"prop":{},"outedges":[{"to":12}]},{"id":12,"prop":{"gender":"F"}}],"order":[[],[],[],[6,5,0,1,2,9,10],[7,3,11],[8,4,12]],"ranks":[3,3,3,4,5,3,3,4,5,3,3,4,5],"positionByOrder":[[],[],[],[-19,-7,5,17,29,41,53],[-7,17,41],[-7,17,41]],"positions":[5,17,29,17,17,-7,-19,-7,-7,41,53,41,41]};

export {
  preset1,
  preset2,
  preset3,
  preset4,
  preset5,
  preset6,
  preset7,
  preset8,
  preset9
}