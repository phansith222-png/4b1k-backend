export const likePostData = [
  // --- โพสต์ยอดฮิต (ID: 1-5, 9, 11, 16) ---
  // Post ID 1 (NONT TANONT):
  { userId: 1, postId: 1 }, { userId: 2, postId: 1 }, { userId: 4, postId: 1 }, { userId: 6, postId: 1 }, { userId: 7, postId: 1 }, { userId: 8, postId: 1 }, { userId: 11, postId: 1 }, { userId: 15, postId: 1 },
  
  // Post ID 3 (The Weeknd News):
  { userId: 5, postId: 3 }, { userId: 7, postId: 3 }, { userId: 12, postId: 3 }, { userId: 14, postId: 3 }, { userId: 26, postId: 3 }, { userId: 1, postId: 3 }, { userId: 2, postId: 3 },
  
  // Post ID 9 (KISS OF LIFE Review):
  { userId: 1, postId: 9 }, { userId: 3, postId: 9 }, { userId: 4, postId: 9 }, { userId: 7, postId: 9 }, { userId: 15, postId: 9 }, { userId: 21, postId: 9 }, { userId: 11, postId: 9 }, { userId: 13, postId: 9 },

  // Post ID 11 (Taylor Swift - Eras Tour):
  { userId: 3, postId: 11 }, { userId: 4, postId: 11 }, { userId: 8, postId: 11 }, { userId: 11, postId: 11 }, { userId: 14, postId: 11 }, { userId: 21, postId: 11 }, { userId: 15, postId: 11 },

  // --- กระจายไลก์ให้ User แต่ละคน (User ID 7-26) ---
  // kpop_stan_01 (ID: 7) ชอบกดไลก์สาย K-Pop
  { userId: 7, postId: 10 }, { userId: 7, postId: 12 }, { userId: 7, postId: 13 }, { userId: 7, postId: 18 }, { userId: 7, postId: 22 }, { userId: 7, postId: 33 }, { userId: 7, postId: 49 },

  // melody_queen (ID: 8) สาย Pop/Diva
  { userId: 8, postId: 5 }, { userId: 8, postId: 17 }, { userId: 8, postId: 20 }, { userId: 8, postId: 30 }, { userId: 8, postId: 32 }, { userId: 8, postId: 45 },

  // rock_never_die (ID: 9) สายร็อค
  { userId: 9, postId: 2 }, { userId: 9, postId: 15 }, { userId: 9, postId: 25 }, { userId: 9, postId: 44 },

  // frontrow_girl (ID: 11) สายคอนเสิร์ต
  { userId: 11, postId: 7 }, { userId: 11, postId: 14 }, { userId: 11, postId: 21 }, { userId: 11, postId: 27 }, { userId: 11, postId: 29 }, { userId: 11, postId: 35 }, { userId: 11, postId: 41 }, { userId: 11, postId: 42 },

  // bass_hunter (ID: 12) สายตื๊ด/ฮิปฮอป
  { userId: 12, postId: 4 }, { userId: 12, postId: 38 }, { userId: 12, postId: 43 }, { userId: 12, postId: 24 }, { userId: 12, postId: 47 },

  // ticket_master_th (ID: 14) สายกดบัตร
  { userId: 14, postId: 1 }, { userId: 14, postId: 34 }, { userId: 14, postId: 39 }, { userId: 14, postId: 11 }, { userId: 14, postId: 28 },

  // concert_addict (ID: 15)
  { userId: 15, postId: 9 }, { userId: 15, postId: 12 }, { userId: 15, postId: 46 }, { userId: 15, postId: 49 }, { userId: 15, postId: 23 },

  // --- ไลก์ในโพสต์เตือนภัย/รีวิวทั่วไป (ID: 6, 7, 8, 19, 29) ---
  { userId: 1, postId: 6 }, { userId: 3, postId: 6 }, { userId: 5, postId: 6 }, { userId: 10, postId: 6 }, { userId: 13, postId: 6 },
  { userId: 2, postId: 7 }, { userId: 4, postId: 7 }, { userId: 12, postId: 7 }, { userId: 23, postId: 7 },
  { userId: 6, postId: 8 }, { userId: 15, postId: 8 }, { userId: 21, postId: 8 }, { userId: 26, postId: 8 },
  { userId: 1, postId: 19 }, { userId: 3, postId: 19 }, { userId: 14, postId: 19 }, { userId: 22, postId: 19 },

  // --- เติมโพสต์ท้ายๆ ให้ไม่เหงา (ID: 30-50) ---
  { userId: 26, postId: 30 }, { userId: 26, postId: 31 }, { userId: 26, postId: 40 }, { userId: 26, postId: 48 },
  { userId: 23, postId: 36 }, { userId: 23, postId: 37 }, { userId: 23, postId: 42 }, { userId: 23, postId: 50 },
  { userId: 22, postId: 44 }, { userId: 22, postId: 47 }, { userId: 22, postId: 48 },
  { userId: 21, postId: 13 }, { userId: 21, postId: 18 }, { userId: 21, postId: 28 }, { userId: 21, postId: 32 },
  { userId: 16, postId: 31 }, { userId: 16, postId: 40 }, { userId: 16, postId: 43 },
  { userId: 3, postId: 50 }, { userId: 4, postId: 41 }, { userId: 5, postId: 44 }, { userId: 6, postId: 35 },
  { userId: 10, postId: 37 }, { userId: 13, postId: 30 }, { userId: 2, postId: 48 }, { userId: 1, postId: 48 }
];