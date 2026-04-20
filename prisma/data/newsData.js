export const newsData = [
  // ข่าวที่ 1
  { title: "Taylor Swift ประกาศทัวร์คอนเสิร์ตในเอเชียตะวันออกเฉียงใต้!", content: "Global Pop Icon ทัวร์ครั้งใหม่ที่ทุกคนรอคอย เริ่มกดบัตรเดือนหน้า แฟนๆ เตรียมตัวให้พร้อม!", coverImage: "https://example.com/images/news/taylor-tour.jpg", authorId: 1 },
  // ข่าวที่ 2
  { title: "Rolling Loud Thailand 2026 ประกาศ Line up สุดเดือด!", content: "เทศกาลฮิปฮอปที่ใหญ่ที่สุดในโลกกลับมาอีกครั้ง นำทัพโดย Kendrick Lamar, Travis Scott และแร็ปเปอร์ชาวไทยอย่าง F.HERO และ MILLI", coverImage: "https://example.com/images/news/rolling-loud.jpg", authorId: 2 },
  // ข่าวที่ 3
  { title: "อัปเดตระบบการจองคิวซื้อบัตรแบบใหม่", content: "เพื่อป้องกันปัญหาบอทและตั๋วผี ทางเราได้อัปเดตระบบต่อคิวแบบใหม่ (Virtual Waiting Room) ที่จะเริ่มใช้ในเดือนนี้", coverImage: "https://example.com/images/news/system-update.jpg", authorId: 1 },
  // ข่าวที่ 4
  { title: "การคอลแลปส์สุดเซอร์ไพรส์: Jeff Satur x NIKI", content: "เตรียมพบกับซิงเกิลใหม่แนว R&B ที่เป็นการร่วมงานกันข้ามประเทศระหว่าง Jeff Satur และ NIKI จากค่าย 88rising", coverImage: "https://example.com/images/news/jeff-niki-collab.jpg", authorId: 2 },
  // ข่าวที่ 5
  { title: "Bodyslam จัดคอนเสิร์ตใหญ่ ณ ราชมังคลากีฬาสถาน", content: "วงร็อคอันดับ 1 ของไทย กลับมาทวงบัลลังก์ความยิ่งใหญ่อีกครั้งกับคอนเสิร์ตความจุระดับ 50,000 คน", coverImage: "https://example.com/images/news/bodyslam-live.jpg", authorId: 1 },
  // ข่าวที่ 6
  { title: "เจ้าแม่ Pop/R&B ไทย: INK WARUNTORN และ BOWKYLION กวาดรางวัลเรียบ!", content: "ในงานประกาศรางวัลเพลงแห่งปี ทั้งสองศิลปินหญิงคว้ารางวัลไปได้อย่างภาคภูมิใจ", coverImage: "https://example.com/images/news/ink-bowky.jpg", authorId: 1 },
  // ข่าวที่ 7
  { title: "Early Bird Promotion! ลดราคาพิเศษสำหรับสมาชิก", content: "เฉพาะสมาชิกที่สมัครแพ็กเกจพรีเมียม รับส่วนลดค่าบัตรคอนเสิร์ต 10% ทุกงานตลอดปีนี้", coverImage: "https://example.com/images/news/promo.jpg", authorId: 2 },
  // ข่าวที่ 8
  { title: "EDM Festival ดึง 3 ดีเจระดับท็อปลงสเตจเดียวกัน", content: "มันส์ข้ามคืนไปกับ Martin Garrix, Zedd และ Illenium ในงานเทศกาลดนตรีอิเล็กทรอนิกส์ส่งท้ายปี", coverImage: "https://example.com/images/news/edm-fest.jpg", authorId: 2 },
  // ข่าวที่ 9
  { title: "NONT TANONT ปล่อยอัลบั้มเต็มชุดใหม่", content: "นักร้องเสียงนุ่มเตรียมปล่อย 10 เพลงใหม่ที่จะทำให้คุณใจละลาย ฟังพร้อมกันทุกสตรีมมิ่งคืนนี้", coverImage: "https://example.com/images/news/nont-album.jpg", authorId: 1 },
  // ข่าวที่ 10
  { title: "ประกาศ: เลื่อนการจำหน่ายบัตรชั่วคราว (วันที่ 15 พฤษภาคม)", content: "เนื่องจากกระแสตอบรับอย่างล้นหลาม เซิร์ฟเวอร์ขัดข้องชั่วคราว ทางเราขอเลื่อนการจำหน่ายบัตรออกไป 2 ชั่วโมง", coverImage: null, authorId: 2 },

  { title: "KISS OF LIFE ประกาศชื่อแฟนด้อมอย่างเป็นทางการ!", content: "สี่สาวรุกกี้ปีศาจเตรียมเซอร์ไพรส์แฟนๆ ด้วยชื่อเรียกสุดน่ารัก พร้อมประกาศแท่งไฟออฟฟิเชียลเร็วๆ นี้", coverImage: "https://example.com/kiof-fandom.jpg", authorId: 1 },
  { title: "NewJeans เตรียมบุกตลาดญี่ปุ่นด้วยซิงเกิลพิเศษ", content: "Bunny เตรียมตัว! ห้าสาวเตรียมเดบิวต์ฝั่งญี่ปุ่นอย่างเป็นทางการพร้อมสเตจสุดอลังการ", coverImage: "https://example.com/nwjns-jp.jpg", authorId: 2 },
  { title: "Stray Kids x aespa? ข่าวลือการคอลแลปส์สเตจในงานปลายปี", content: "กลายเป็นไวรัลทันทีเมื่อมีภาพหลุดการซ้อมเต้นที่คาดว่าเป็นโปรเจกต์พิเศษระหว่างสองวงตัวตึง", coverImage: "https://example.com/skz-aespa-rumor.jpg", authorId: 1 },
  { title: "IVE สร้างสถิติใหม่ ยอดขายอัลบั้มทะลุ 2 ล้านก๊อปปี้", content: "ตอกย้ำความปังของตัวแม่ Gen 4 ด้วยยอดขายถล่มทลายทั่วโลก", coverImage: "https://example.com/ive-record.jpg", authorId: 2 },
  { title: "Bruno Mars เพิ่มรอบที่ 3 ในไทยตามคำเรียกร้อง!", content: "ทนกระแสไม่ไหว! ผู้จัดประกาศเพิ่มรอบสุดท้าย ใครยังไม่มีบัตรเตรียมตัวด่วน", coverImage: "https://example.com/bruno-bkk.jpg", authorId: 1 },

  // --- กลุ่ม Thai Music & Festivals ---
  { title: "Three Man Down และ Tilly Birds เตรียมจัดคอนเสิร์ตคู่ครั้งแรก", content: "เมื่อสองวงดนตรีเพื่อนรักต้องมาดวลกันบนเวที ความสนุกระดับคูณสองกำลังจะเริ่มขึ้น", coverImage: "https://example.com/tmd-tilly-concert.jpg", authorId: 1 },
  { title: "4EVE เตรียมปล่อยอัลบั้มเต็มชุดที่ 2", content: "เจ็ดสาวเกิร์ลกรุ๊ปอันดับ 1 ของไทยเตรียมส่งเพลงใหม่ที่บอกเลยว่าล้างชาร์ตแน่นอน", coverImage: "https://example.com/4eve-album.jpg", authorId: 2 },
  { title: "Jeff Satur เตรียมโกอินเตอร์ทัวร์คอนเสิร์ตที่ลอนดอน", content: "ความภูมิใจของชาวคุณวันเสาร์! เจฟเตรียมพาดนตรีไทยไปสู่ระดับโลกในเดือนหน้า", coverImage: "https://example.com/jeff-london.jpg", authorId: 1 },
  { title: "รวมพลคนรักดนตรี Indie: Phum Viphurit x Violette Wautier", content: "เตรียมพบกับค่ำคืนสุดชิลล์ริมทะเลกับสองศิลปินอินดี้แถวหน้าของไทย", coverImage: "https://example.com/indie-night.jpg", authorId: 2 },
  { title: "Lomosonic ประกาศปล่อยสารคดีเส้นทางสายร็อค", content: "เบื้องหลังความสำเร็จและความทุ่มเทกว่าจะมาเป็นวงร็อคพลังใบในวันนี้", coverImage: "https://example.com/lomo-doc.jpg", authorId: 1 },

  // --- กลุ่มข่าวสารทั่วไป (ไม่ระบุศิลปิน) ---
  { title: "เตือนภัยมิจฉาชีพ! ระวังเพจปลอมรับกดบัตรคอนเสิร์ต", content: "โปรดตรวจสอบข้อมูลบริษัทให้ชัดเจนก่อนโอนเงิน ทางเราไม่มีนโยบายรับโอนเข้าบัญชีบุคคล", coverImage: "https://example.com/scam-alert.jpg", authorId: 1 },
  { title: "อัปเดตผังที่นั่งสนามราชมังฯ ปี 2026", content: "ปรับปรุงใหม่เพื่อให้ทุกที่นั่งสามารถมองเห็นสเตจได้ชัดเจนยิ่งขึ้น", coverImage: "https://example.com/map-update.jpg", authorId: 2 },
  { title: "แนะนำวิธีใช้ E-Ticket เข้างานคอนเสิร์ต", content: "ไม่ต้องพกบัตรแข็งอีกต่อไป เพียงโชว์ QR Code จากแอปพลิเคชันก็เข้างานได้ทันที", coverImage: "https://example.com/e-ticket-guide.jpg", authorId: 1 },
  { title: "รวมของใช้ที่ห้ามนำเข้าฮอลล์คอนเสิร์ต", content: "เช็คลิสต์ด่วน! อะไรพกได้ อะไรพกไม่ได้ เพื่อความรวดเร็วในการตรวจค้นก่อนเข้างาน", coverImage: "https://example.com/prohibited-items.jpg", authorId: 2 },

  // --- ข่าว K-Pop / J-Pop / International เพิ่มเติม ---
  { title: "YOASOBI เตรียมทำเพลงประกอบอนิเมะฟอร์มยักษ์", content: "คู่หูมหัศจรรย์จากญี่ปุ่นเตรียมส่งผลงานใหม่มัดใจแฟนเพลงทั่วโลกอีกครั้ง", coverImage: "https://example.com/yoasobi-news.jpg", authorId: 1 },
  { title: "Olivia Rodrigo ประกาศทัวร์ GUTS ในเอเชียเพิ่มเติม", content: "ชาวไทยมีลุ้น! ลิสต์รายชื่อประเทศที่เพิ่มเข้ามามีลุ้นกรุงเทพฯ 2 รอบ", coverImage: "https://example.com/olivia-asia.jpg", authorId: 1 },
  { title: "Fujii Kaze กับคอนเสิร์ตสเกลใหญ่ที่สุดในไทย", content: "เตรียมสัมผัสพลังงานบวกและดนตรีบำบัดจิตวิญญาณจากศิลปินหนุ่มสุดฮอต", coverImage: "https://example.com/fujii-bkk.jpg", authorId: 2 },
  { title: "The Weeknd เตรียมปล่อยโปรเจกต์ลับร่วมกับ Ariana Grande", content: "คู่หูตัวท็อปแห่งวงการ R&B เตรียมกลับมาทวงบัลลังก์เพลงฮิตอีกครั้ง", coverImage: "https://example.com/weeknd-ariana.jpg", authorId: 1 },
  { title: "แชร์พิกัดที่จอดรถใกล้ Impact Arena", content: "หมดปัญหาวนหาที่จอดรถเป็นชั่วโมง เรารวบรวมจุดจอดใกล้และถูกมาให้แล้ว", coverImage: "https://example.com/parking-impact.jpg", authorId: 2 },
  { title: "ประกาศผลรางวัล Concert Of The Year", content: "รางวัลใหญ่ปีนี้ตกเป็นของศิลปินคนไหน? เข้ามาดูรายชื่อผู้ชนะทั้งหมดได้ที่นี่", coverImage: "https://example.com/award-winners.jpg", authorId: 1 },

  // --- ข่าวจำลองเพิ่มเติมให้ครบจำนวน (กระจายเนื้อหาคละแนว) ---
  { title: "รีวิวแอปพลิเคชันติดตามคอนเสิร์ตโฉมใหม่", content: "ฟีเจอร์ใหม่ที่ทำให้คุณไม่พลาดทุกความเคลื่อนไหวของศิลปินที่คุณรัก", coverImage: null, authorId: 1 },
  { title: "ศิลปินเกาหลีตบเท้าเข้าร่วมงานแฟชั่นโชว์ที่ไทย", content: "รวมภาพความประทับใจเมื่อศิลปินตัวท็อปปรากฏตัวกลางห้างดัง", coverImage: "https://example.com/fashion-news.jpg", authorId: 2 },
  { title: "NIKI ประกาศเซอร์ไพรส์แฟนไทยในคอนเสิร์ตเดี่ยว", content: "เตรียมพบกับแขกรับเชิญพิเศษที่ไม่มีใครคาดถึง!", coverImage: "https://example.com/niki-surprise.jpg", authorId: 1 },
  { title: "ฮือฮา! พบศิลปินดังเดินเล่นย่านสยามสแควร์", content: "แฟนคลับแชร์ว่อนโซเชียล เมื่อศิลปินระดับโลกทำตัวติดดินเดินชิมสตรีทฟู้ดไทย", coverImage: null, authorId: 2 },

  // --- K-Pop & J-Pop ---
  { title: "เบื้องหลังมิวสิควิดีโอใหม่ KISS OF LIFE: สวยสับระดับอินเตอร์", content: "พาไปดูเบื้องหลังการถ่ายทำ MV ที่ใช้โปรดักชั่นสุดอลังการ พร้อมบทสัมภาษณ์สุดพิเศษจากสาวๆ ทั้ง 4 คน", coverImage: "https://example.com/news/kiof-behind.jpg", authorId: 1 },
  { title: "aespa ประกาศจัดคอนเสิร์ตฮอลล์ใหญ่ครั้งแรกในไทย!", content: "MY ชาวไทยเตรียมตัวให้พร้อม กับการเนรมิตโลก Kwangya มาไว้ที่กรุงเทพฯ ปลายปีนี้", coverImage: "https://example.com/news/aespa-bkk.jpg", authorId: 2 },
  { title: "Fujii Kaze สร้างปรากฏการณ์บัตร Sold Out ทุกที่นั่งภายในพริบตา", content: "แรงไม่หยุด! ศิลปินหนุ่มจากญี่ปุ่นพิสูจน์พลังแฟนคลับไทย บัตรคอนเสิร์ตถูกจองเต็มทุกโซน", coverImage: "https://example.com/news/fujii-soldout.jpg", authorId: 1 },
  { title: "NewJeans ได้รับเลือกเป็น Global Brand Ambassador แบรนด์ดัง", content: "ตอกย้ำอิทธิพลในวงการแฟชั่น เมื่อห้าสาว Bunny กลายเป็นไอคอนคนใหม่ของแบรนด์ระดับโลก", coverImage: "https://example.com/news/nwjns-fashion.jpg", authorId: 2 },
  { title: "YOASOBI เผยความประทับใจหลังมาเยือนไทยครั้งล่าสุด", content: "สองคู่หูเล่าถึงอาหารไทยที่ชอบและพลังงานจากแฟนๆ ที่ทำให้พวกเขาอยากกลับมาอีกบ่อยๆ", coverImage: "https://example.com/news/yoasobi-interview.jpg", authorId: 1 },

  // --- Thai Artists ---
  { title: "NONT TANONT เตรียมปล่อยเพลงคอลแลปส์สุดเซอร์ไพรส์กับศิลปินสากล", content: "นนท์ ธนนท์ เตรียมข้ามฝั่งไปร่วมงานกับศิลปินแนวหน้าจากอเมริกา งานนี้แฟนๆ มีลุ้นหูเคลือบทอง", coverImage: "https://example.com/news/nont-inter.jpg", authorId: 1 },
  { title: "4EVE เตรียมจัดงานแฟนไซน์ครั้งใหญ่ขอบคุณแฟนคลับ", content: "โอกาสใกล้ชิดเจ็ดสาวมาถึงแล้ว! เตรียมลุ้นเป็นผู้โชคดีที่จะได้ลายเซ็นและพูดคุยแบบเอ็กซ์คลูซีฟ", coverImage: "https://example.com/news/4eve-fansign.jpg", authorId: 2 },
  { title: "Tilly Birds ปล่อยเพลงเศร้าเพลงใหม่ที่ทำเอาคนอกหักต้องร้องไห้โฮ", content: "กลับมาตอกย้ำเจ้าพ่อเพลงเศร้า กับซิงเกิลใหม่ที่ยอดวิวพุ่งทะลุล้านภายในไม่กี่ชั่วโมง", coverImage: "https://example.com/news/tb-sad-song.jpg", authorId: 1 },
  { title: "INK WARUNTORN เตรียมโชว์พิเศษในงานเทศกาลดนตรีฤดูหนาว", content: "เจ้าหญิงซินธ์ป็อปเตรียมลิสต์เพลงเต้นและเพลงเพราะมาสร้างความอบอุ่นให้กับแฟนๆ ท่ามกลางลมหนาว", coverImage: "https://example.com/news/ink-winter.jpg", authorId: 2 },
  { title: "Jeff Satur เผยโปรเจกต์งานแสดงชิ้นใหม่ที่ต้องควบทั้งเล่นและร้อง", content: "เจฟพิสูจน์ความสามารถรอบด้านอีกครั้ง กับบทบาทใหม่ที่ท้าทายที่สุดในอาชีพการแสดง", coverImage: "https://example.com/news/jeff-new-project.jpg", authorId: 1 },

  // --- International Stars ---
  { title: "Taylor Swift ปล่อยอัลบั้ม Re-recorded ชุดต่อไปที่แฟนๆ เฝ้ารอ", content: "การกลับมาของเวอร์ชันที่ Taylor เป็นเจ้าของเองอย่างสมบูรณ์ พร้อมเพลงใหม่จาก Vault ที่ไม่เคยมีใครได้ฟัง", coverImage: "https://example.com/news/taylor-vault.jpg", authorId: 1 },
  { title: "The Weeknd เผยภาพทีเซอร์โปรเจกต์หนังระดับบล็อกบัสเตอร์", content: "นอกจากงานเพลงที่ปังแล้ว แฟนๆ เตรียมพบกับผลงานในจอเงินที่เขาตั้งใจซุ่มทำมานาน", coverImage: "https://example.com/news/weeknd-movie.jpg", authorId: 2 },
  { title: "Olivia Rodrigo กับสเตจสุดร็อคที่งานเทศกาลดนตรีระดับโลก", content: "โชว์พลังเสียงและลีลาการเล่นกีตาร์ที่ทำเอาเวทีลุกเป็นไฟ ตอกย้ำความเป็นร็อคสตาร์ยุคใหม่", coverImage: "https://example.com/news/olivia-live.jpg", authorId: 1 },
  { title: "Bruno Mars โชว์ทักษะการทำอาหารไทยในโซเชียลจนเป็นไวรัล", content: "ความน่ารักของบรูโน่ที่พยายามตำส้มตำเอง ทำเอาแฟนๆ ไทยแห่เข้าไปคอมเมนต์แซวกันเพียบ", coverImage: null, authorId: 2 },
  { title: "SZA เตรียมจัดไลฟ์คอนเสิร์ตแบบสตรีมมิ่งทั่วโลก", content: "เพื่อแฟนๆ ที่ไม่ได้ไปดูทัวร์จริง SZA จัดเต็มโปรดักชั่นให้ชมสดๆ ผ่านหน้าจอพร้อมกัน", coverImage: "https://example.com/news/sza-stream.jpg", authorId: 1 },

  // --- ข่าวสารทั่วไปในวงการ (General / Multiple Artists) ---
  { title: "สรุปสถิติศิลปินไทยที่มียอดสตรีมสูงสุดในปี 2026", content: "เปิดโผรายชื่อศิลปินที่ครองใจผู้ฟังชาวไทยมากที่สุด จะมีศิลปินที่คุณชอบไหม? เข้ามาเช็คกันเลย", coverImage: "https://example.com/news/stat-2026.jpg", authorId: 2 },
  { title: "เตือน! บัตรคอนเสิร์ต 'อัพราคา' เสี่ยงถูกยกเลิกการเข้างาน", content: "ผู้จัดเข้มงวดตรวจสอบบัตรที่นำมาขายต่อเกินราคา ใครซื้อบัตรหลุดระวังถูกแบนหน้างานนะ", coverImage: null, authorId: 1 },
  { title: "อัปเดตระบบสะสมแต้มสำหรับแฟนตัวยง (Top Fan System)", content: "ยิ่งกดไลก์ คอมเมนต์ และติดตามข่าวสาร ยิ่งมีสิทธิ์ลุ้นรับของรางวัลสุดพิเศษจากเรา", coverImage: "https://example.com/news/top-fan.jpg", authorId: 1 },
  { title: "รวมลุคแฟชั่นสุดปังของศิลปินไทยในงาน Red Carpet ล่าสุด", content: "ส่องความสวยหล่อของคนบันเทิงที่ตบเท้าเข้าร่วมงานประกาศรางวัลระดับประเทศ", coverImage: "https://example.com/news/red-carpet.jpg", authorId: 2 },
  { title: "ประกาศ: เลื่อนกำหนดการเปิดขายสินค้า Official ของหน้าเว็บ", content: "เนื่องจากปัญหานำเข้าสินค้าเล็กน้อย ทางทีมงานขอเลื่อนเปิดระบบไปเป็นสัปดาห์หน้า ขออภัยในความไม่สะดวก", coverImage: null, authorId: 1 }
];