const whatsappNumber = '919390989002';
const PAGE_SIZE = 24;

const categoryMeta = {
  car: { tag: 'RIDE-ON CAR', type: 'ELECTRIC KIDS CAR', scope: 'ride-on cars', tagClass: '', fallback: 'assets/images/lime-supercar.jpg' },
  bike: { tag: 'RIDE-ON BIKE', type: 'ELECTRIC KIDS BIKE', scope: 'ride-on bikes', tagClass: 'tag-red', fallback: 'assets/images/audi-rideon.webp' },
  parts: { tag: 'REPLACEMENT PART', type: 'SPARE / REPLACEMENT PART', scope: 'replacement parts', tagClass: 'tag-gold', fallback: 'assets/images/red-suv.jpg' }
};

// Product names, listed prices, specs and photos were transcribed from the public
// 11Cart collections (ride-on-cars, ride-on-bikes, replacement-parts).
// Prices and stock are indicative only; confirm with Sony Kids World before purchase.
const products = [
{ t: "11CART Mini Thar 12V 4x4 Electric Ride-On Jeep for Kids", p: "₹7,499", c: 'car', m: "12V · 4WD", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Kids_jeep.jpg?width=600", a: true },
  { t: "11CART Ford Ride-On Jeep for Kids", p: "₹7,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/8_b810e46b-90d4-4ad0-b386-24a8ee71b2a5.jpg?width=600", a: true },
  { t: "11CART Mini 4x4 Battery Operated Ride-On Jeep for Kids", p: "₹7,499", c: 'car', m: "4WD · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Thar_1.jpg?width=600", a: true },
  { t: "11CART Mini Thar Electric Ride-On Jeep for Kids", p: "₹7,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_56f38727-d71f-4013-8202-58b925c108b9.jpg?width=600", a: true },
  { t: "Toyota Black Jeep", p: "₹9,999", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/WhatsAppImage2025-05-09at4.38.16PM_1.jpg?width=600", a: true },
  { t: "Mercedes G63 4WD Ride-On Jeep for Kids", p: "₹9,999", c: 'car', m: "4WD", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/WhatsAppImage2025-05-09at4.34.22PM.jpg?width=600", a: true },
  { t: "4x4 Battery Operated Kids Jeep Ride-On Car", p: "₹9,999", c: 'car', m: "4WD · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/WhatsAppImage2025-05-09at4.38.11PM.jpg?width=600", a: true },
  { t: "Kids Battery Operated Ride On Jeep", p: "₹9,999", c: 'car', m: "Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/WhatsAppImage2025-05-09at4.36.03PM.jpg?width=600", a: true },
  { t: "Rechargeable Ride-On Jeep for Kids", p: "₹10,499", c: 'car', m: "Rechargeable", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Kids_Jeep_Battery_Operated.webp?width=600", a: true },
  { t: "Kids Jeep Mercedez G63 4WD", p: "₹10,500", c: 'car', m: "4WD", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/WhatsAppImage2024-05-14at12.51.52PM_1.jpg?width=600", a: true },
  { t: "Kids Jeep 4*4 Wheel Drive | Remote & Parent Control", p: "₹10,499", c: 'car', m: "4WD · Parent remote", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/KidsJeepBatteryOperated_2.png?width=600", a: true },
  { t: "11CART Kids Ride-On Jeep 4WD - Premium Electric Jeep for Kids", p: "₹13,499", c: 'car', m: "4WD", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_f2afc757-8c0c-4725-8a81-8ecae9d84a10.jpg?width=600", a: true },
  { t: "11CART Kids Ride-On Thar Jeep 4WD", p: "₹13,499", c: 'car', m: "4WD", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/11_aff61e03-4503-423f-895c-7fe660c4f4b1.jpg?width=600", a: true },
  { t: "11CART Toyota-Style Kids Ride-On Jeep 4WD", p: "₹13,499", c: 'car', m: "4WD", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/23.jpg?width=600", a: true },
  { t: "Lamborghini Electric Sports Ride on Car for Kids | 4 Channel Parental Control", p: "₹12,499", c: 'car', m: "Parent remote", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/a09b4586-003a-4256-8979-da33f8803406.jpg?width=600", a: true },
  { t: "11CART Kids Ride-On JCB Excavator | 12V Battery-Powered Excavator Toy", p: "₹13,499", c: 'car', m: "12V · Battery operated · Construction vehicle", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Hf0aee32f423a4570959c6103e9568f1fK.jpg?width=600", a: false },
  { t: "11CART Premium Mini Cooper Kids Ride-On Car 12V", p: "₹13,499", c: 'car', m: "12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/RUrPUIqLbKMDjdwkFY.jpg?width=600", a: true },
  { t: "11CART New Ferreri Kids Electric Ride-On Car", p: "₹14,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/4_9e100656-be49-4a69-8b52-ae1802cd8d91.jpg?width=600", a: false },
  { t: "11CART Porsche GT3 RS Kids Electric Ride-On Car", p: "₹14,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/5_bdaebd73-939e-486c-bd75-f22c1444f1a3.jpg?width=600", a: true },
  { t: "Police Car For Kids Turbo F8 12V With Remote Control", p: "₹14,499", c: 'car', m: "12V · Parent remote", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Yellow.webp?width=600", a: true },
  { t: "Dual Battery Multifunctional steering F8 Ride on Car for Kids | Remote Control & Manual Drive", p: "₹14,499", c: 'car', m: "Parent remote · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/products/11_cart_271224678_1228100857715546_4727711970868799955_n.jpg?width=600", a: true },
  { t: "11CART Kids Ride On Tractor 12V Battery Operated with Hydraulic Trolley, Dual Motor Electric Tractor for Kids with Music & Lights", p: "₹14,499", c: 'car', m: "12V · Battery operated · Music", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_c6a1dcdf-09c4-4274-b6af-83148e43d2c8.jpg?width=600", a: true },
  { t: "Kids Ride on Tractor New Model Big Size | Electric Power Source", p: "₹14,499", c: 'car', m: "Construction vehicle", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/products/KidsRideonTractor2022NewModelBigSize_20.jpg?width=600", a: true },
  { t: "Ride-On Rechargeable Mirage Kids Jeep SUV Car with Remote Controller", p: "₹14,999", c: 'car', m: "Parent remote · Rechargeable", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/71EUUKXr9_L._SL1456.jpg?width=600", a: true },
  { t: "2024 Kids Jeep Tank Model Ride on Jeep", p: "₹13,499", c: 'car', m: "Utility styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/387B73AF-50A3-49A9-B9BB-0527E32085E6.jpg?width=600", a: true },
  { t: "11CART Mercedes V8 Kids Ride-On Mini SUV", p: "₹15,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_9dcf7080-f8f4-4a1a-bcec-1a9d23492c35.jpg?width=600", a: true },
  { t: "Rolls Royce Dual-Seat 12 V Electric Ride-On Car for Kids", p: "₹15,499", c: 'car', m: "12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/48b128fa2e7e4cb4b56fd4a5d037852e.png?width=600", a: true },
  { t: "11CART Mercedes Maybach Luxury Kids Ride-On SUV", p: "₹16,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/12_acc5525c-c717-4430-8d0f-11d5e756399d.jpg?width=600", a: true },
  { t: "11CART Ferrari F90 Turbo Kids Ride-On Sports Car", p: "₹16,500", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/21_fd81cfbe-b6fe-481a-950b-c3b7115254ac.jpg?width=600", a: true },
  { t: "4X4 Heavy Duty 12V Electric Ride On Jeep For Kids With Remote Control Wn 502", p: "₹16,499", c: 'car', m: "12V · 4WD · Parent remote", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/502BE8B8-0B43-4837-A278-69068B0D7EC6.png?width=600", a: false },
  { t: "Rolls Royce Electric Ride on Car for Kids & Toddlers with Remote Control - Red", p: "₹17,499", c: 'car', m: "Parent remote", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/271280961_5111998338851984_5942573611240550731_n.jpg?width=600", a: true },
  { t: "Rolls Royce Rechargeable Ride on Car for Kids & Toddlers with Remote Control - Purple", p: "₹17,499", c: 'car', m: "Parent remote · Rechargeable", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/rollsroycekidscar_11.jpg?width=600", a: true },
  { t: "Rolls Royce Rechargeable Ride on Car for Kids & Toddlers with Remote Control - Black", p: "₹17,499", c: 'car', m: "Parent remote · Rechargeable", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/rollsroycekidscar_2.jpg?width=600", a: true },
  { t: "Mercedes Benz 12V Ride on Car with remote & Manual Drive for Kids", p: "₹17,499", c: 'car', m: "12V · Parent remote", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_c7d9773b-71c4-45e8-8988-f3284177bd98.jpg?width=600", a: true },
  { t: "11CART Premium BMW Kids Ride-On SUV 12V Electric Car", p: "₹18,500", c: 'car', m: "12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_53c4cae7-1dd2-4424-9622-04005e4a5f72.jpg?width=600", a: true },
  { t: "Kids Electric Ride On Jeep Ford Edition 4WD | 11CART", p: "₹18,499", c: 'car', m: "4WD", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/H6cadec243ae240b3b7dc99aa8c3c8b83f.jpg_720x720q50.webp?width=600", a: true },
  { t: "Mercedes Kids Jeep | Jumbo Size Baby Jeep 4 Wheel Drive", p: "₹18,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/H6e4543a5b1ad421ea5c31ae9e6fe5f02A.jpg_720x720q50.webp?width=600", a: false },
  { t: "Kids Electric Vintage Mercedez Benz Ride On Sports Car", p: "₹18,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/He0f0e993666141b2b5ff4f3f31b9d572A.jpg?width=600", a: true },
  { t: "KP 906 Heavy Duty 4X4 Safari Explorer Ride-On Jeep | Mini", p: "₹18,499", c: 'car', m: "4WD · Heavy duty", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Hde64b0352f954bdc898e075873455060c.webp?width=600", a: true },
  { t: "12V 4x4 Ride On Jeep for Kids with Remote | Dual Seats, Music System & Rear Suspension", p: "₹18,499", c: 'car', m: "12V · 4WD · Parent remote", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/3_42e0a837-249b-4bca-b59e-1fbd7f4580e1.png?width=600", a: true },
  { t: "Kids Ride On Lamborghini Car 12V Battery Operated Electric Car with Remote Control", p: "₹19,499", c: 'car', m: "12V · Parent remote · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_c6afc0e8-dbbf-425d-ae00-887edeb5267b.jpg?width=600", a: false },
  { t: "12V Lamborghini NEL-603 Racing Car for Kids | pedal/steering wheel & remote controller", p: "₹19,499", c: 'car', m: "12V · Parent remote", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_37436af0-6b2c-445f-b87a-af28ab893fba.jpg?width=600", a: false },
  { t: "11CART Lamborghini Huracan Kids Electric Ride-On Car", p: "₹20,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/2_a30508d4-257d-4bfe-8d5d-2da31162b036.jpg?width=600", a: false },
  { t: "11CART Premium Maserati GT Kids Ride-On Sports Car", p: "₹20,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_00f802e0-a0e0-4033-8456-6af2c6093ab1.jpg?width=600", a: true },
  { t: "Mercedes AMG GT Kids Ride-On Sports Car 4WD | 11CART", p: "₹20,499", c: 'car', m: "4WD", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/9_67a5e8df-f17b-49c2-93b3-1928ac83c402.jpg?width=600", a: true },
  { t: "New Kids Electric Ride-On Auto Rikshaw | 11CART", p: "₹21,499", c: 'car', m: "Utility styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/3_eda14116-f6fc-4871-88ac-945325798a82.jpg?width=600", a: true },
  { t: "Wild Kem Ride on Jeep Battery Operated", p: "₹20,499", c: 'car', m: "Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/download_22.jpg?width=600", a: false },
  { t: "11CART 2026 Chevrolet 4x4 Kids Ride-On Pickup Truck", p: "₹24,499", c: 'car', m: "4WD · Utility styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_a4ce1bc3-f5fb-4ddd-a305-25a4eba7561d.jpg?width=600", a: true },
  { t: "11CART Premium Kids Ride-On JCB Bulldozer - Electric Construction Vehicle", p: "₹24,500", c: 'car', m: "Construction vehicle", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/10_631b736f-0ceb-4a23-840f-2680545093bf.jpg?width=600", a: false },
  { t: "11CART Tesla L9 Premium 4x4 Kids Ride-On SUV", p: "₹24,499", c: 'car', m: "4WD", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/12_d3c5bca9-9c25-4b29-afdf-e1aefe788cdb.jpg?width=600", a: true },
  { t: "11Cart Chevrolet Kids 12V Dual Seater Battery Operated Ride-On Car", p: "₹24,499", c: 'car', m: "12V · Dual seat · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/7_26ebd47a-815f-44e1-8f69-1561434a2b45.png?width=600", a: false },
  { t: "Mercedez Maybach Luxury Kids Electric Ride-On Car with Leather Seats", p: "₹24,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Mercedes_AMG_12.jpg?width=600", a: true },
  { t: "11CART Lamborghini Urus Squadra Corse 2-Seater Kids Electric Ride-On SUV", p: "₹26,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/WhatsApp_Image_2026-05-17_at_7.03.03_PM_1.jpg?width=600", a: false },
  { t: "Dual-Seater Discovery Electric Ride-On SUV for Kids | 11CART", p: "₹25,499", c: 'car', m: "Dual seat", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_099a9ff4-2285-49c1-92f7-c346fe06baab.jpg?width=600", a: false },
  { t: "Mercedes G-Wagon AMG Official Licensed Kids Ride-On SUV", p: "₹26,499", c: 'car', m: "Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Mercedes.png?width=600", a: false },
  { t: "Mercedez GLC-450 12V Kids Electric Ride-On SUV - 11CART", p: "₹26,499", c: 'car', m: "12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/WhatsApp_Image_2026-08-05_at_17.35.20.jpg?width=600", a: true },
  { t: "BMW X5 12V Ride-On SUV for Kids - Dual Motors | 11CART", p: "₹26,499", c: 'car', m: "12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Bmw-x5.webp?width=600", a: false },
  { t: "Toyota 4x4 Electric Ride-On Car for Kids - Premium Off-Road Toy Vehicle", p: "₹26,499", c: 'car', m: "4WD", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Toyota.png?width=600", a: false },
  { t: "Rechargeable Battery Operated Jeep for Kids", p: "₹26,499", c: 'car', m: "Rechargeable", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/KidsBatteryOperatedJeep_12.png?width=600", a: true },
  { t: "11CART Piaggio ApeCar 12V Licensed Electric Ride-On Car for Kids", p: "₹27,499", c: 'car', m: "12V · Officially licensed · Utility styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_b14b21cc-fb35-49f8-9c1d-6f24ec5bb87e.jpg?width=600", a: true },
  { t: "11CART Electric Ride-On Heavy-Duty Truck with Remote & Manual Drive", p: "₹28,499", c: 'car', m: "Parent remote · Utility styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/6_c66966f9-2482-4c7a-bcc8-485dcc4e1297.jpg?width=600", a: true },
  { t: "Lamborghini Aventador SVJ 2-Seater Kids Ride-On Car | 11CART", p: "₹28,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Green_Pics_1.jpg?width=600", a: false },
  { t: "11CART Officially Licensed Lexus LX 12V Kids Ride-On SUV", p: "₹28,499", c: 'car', m: "12V · Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Lexus_lx_1.jpg?width=600", a: true },
  { t: "11CART Kids Ultimate Ride-On Jeep UTV ABM-1599", p: "₹28,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/3_7eabeeb5-fc8d-42cf-8249-d79303917208.jpg?width=600", a: true },
  { t: "2026 Dual Seater Bmw Suv Kids Jeep | 4 Motor 12V Battery", p: "₹27,499", c: 'car', m: "12V · Dual seat · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/bmwKidsJeep_4.jpg?width=600", a: true },
  { t: "2026 Vintage Kids Car Dual Accelerator | Imported Quality", p: "₹25,999", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/KD1668_1.jpg?width=600", a: true },
  { t: "Polaris 5388 Kids Jeep Heavy Duty With 150 Kg Weight Capacity", p: "₹30,499", c: 'car', m: "Heavy duty", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Kids_Jeep_Heavy_Duty_With_150_Kg_Weight_Capacity_1.jpg?width=600", a: true },
  { t: "2026 Pollaris 2-Seater Heavy Duty Ride-On Jeep for Kids", p: "₹32,499", c: 'car', m: "Heavy duty", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Polaris_12.jpg?width=600", a: false },
  { t: "11CART Defender Kids SUV | Jumbo Size", p: "₹34,499", c: 'car', m: "Electric ride-on", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Defender_1.png?width=600", a: true },
  { t: "Licensed Bentley Mulsanne Kids Ride-On Car", p: "₹34,499", c: 'car', m: "Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/LicensedBently_1.jpg?width=600", a: true },
  { t: "Aston Martin Aramco F1 Licensed Electric Kids Ride On Race Car", p: "₹35,500", c: 'car', m: "Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/11CartAstonMartinAramcoF1LicensedElectricKidsCar_17_f937bb92-9b81-429f-948e-08e16150cca2.webp?width=600", a: true },
  { t: "Official Licensed 24V Maserati Kids Ride-On Car", p: "₹37,499", c: 'car', m: "24V · Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/LicensedMaserati.jpg?width=600", a: true },
  { t: "Licensed Toyota Land Cruiser Police Kids Car", p: "₹37,499", c: 'car', m: "Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Kids-24V-Electric-Ride-on-Car-Toyota-Land-Cruiser-Police-Edition-Ride-on-Toy-Battery-Parental-Remote-Sirens-Black.webp?width=600", a: false },
  { t: "Licensed Bentley Bentayaga Kids Car", p: "₹37,500", c: 'car', m: "Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/2_a1db14f8-fc64-4a35-9f79-370310b2d679.jpg?width=600", a: true },
  { t: "Licensed Chevrolet Blazer 24V Kids Electric Car", p: "₹37,499", c: 'car', m: "24V · Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Chevrolet_Red.png?width=600", a: true },
  { t: "11CART Ultimate 24V Drifter Kids Ride-On Go Kart", p: "₹40,499", c: 'car', m: "24V · Go-kart", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/28_963eacd1-f7a1-4197-b4af-8bbfa4247a5d.jpg?width=600", a: true },
  { t: "11Cart Mercedez-G63 AMG 12 V Kids Electric Car with Remote", p: "₹45,499", c: 'car', m: "12V · Parent remote", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/WhatsApp_Image_2025-08-09_at_4.12.58_AM.jpg?width=600", a: true },
  { t: "11Cart 24V Electric Go-Kart for Kids - Remote Control, Drift-Style Fun", p: "₹32,499", c: 'car', m: "24V · Parent remote · Go-kart", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Gemini_Generated_Image_8u7rmf8u7rmf8u7r.png?width=600", a: false },
  { t: "24V Eva Tyre Vector X1-DLS UTV Electric Ride On Jeep For Kids", p: "₹34,500", c: 'car', m: "24V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/24VRideonJeep.png?width=600", a: false },
  { t: "24V Beach Buggy Electric Ride on off-road UT Tires", p: "₹34,500", c: 'car', m: "24V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/RideonJeep_2.png?width=600", a: false },
  { t: "Licensed Kids Car Audi Horch 930V 12V Premium Kids Electric Car", p: "₹37,499", c: 'car', m: "12V · Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/2628.webp?width=600", a: false },
  { t: "Licensed Mercedes Benz Concept EQG 12V Ride On Toy Car", p: "₹37,499", c: 'car', m: "12V · Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/11CartMercedesBenzConceptEQG12VRideOnToyCar_3.webp?width=600", a: false },
  { t: "Licensed Bentley GT Super Sports Kids Car White", p: "₹38,499", c: 'car', m: "Officially licensed", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/LicensedBentleyGTSuperSportsKidsCarWhite_1.webp?width=600", a: false },
  { t: "Kids Electric Jeep Ride-On Toy - 12V Battery Powered | 11Cart Model 6169", p: "₹18,499", c: 'car', m: "12V · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/H7b2dd3fa4c3e4af5a266904fc1b22eb0i.webp?width=600", a: false },
  { t: "11cart 3-Wheel Electric Ride-On Bike for Kids - Rechargeable with Music & Lights", p: "₹6,499", c: 'bike', m: "Rechargeable · Music · Lights", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/8188-BLU_1.webp?width=600", a: true },
  { t: "Mini Scooter For Kids Dinosour Model 6V", p: "₹8,499", c: 'bike', m: "6V · Vespa / scooter style", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/WhatsAppImage2024-01-23at17.26.50.jpg?width=600", a: true },
  { t: "11CART Vintage Vespa Rechargeable Kids Scooty with Lights", p: "₹6,999", c: 'bike', m: "Vespa / scooter style · Rechargeable · Lights", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/MiniVespa_8.jpg?width=600", a: true },
  { t: "Vespa Battery Operated Ride on Scooty Pink", p: "₹7,499", c: 'bike', m: "Vespa / scooter style · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/products/st-618-millennial-original-imagjg8pkz4ecerp.jpg?width=600", a: true },
  { t: "Vespa Rechargeable Battery Operated Scooter Blue", p: "₹7,499", c: 'bike', m: "Vespa / scooter style · Rechargeable", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/products/61anmFbX73L._SL1458.jpg?width=600", a: true },
  { t: "Battery Operated Red Vespa Scooter for Kids", p: "₹7,499", c: 'bike', m: "Vespa / scooter style · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/269950E3-CAFA-43E6-AA39-C59FA9B223F0.png?width=600", a: true },
  { t: "12V Electric Ride-On Vespa Mini for Kids - 3-Wheel Scooty | 11cart", p: "₹8,499", c: 'bike', m: "12V · Vespa / scooter style", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/toy_land_cherkala_1738761469_3561311786294909160_51527402250.jpg?width=600", a: true },
  { t: "11CART Premium Kids Battery Operated Ride-On Scooter", p: "₹8,499", c: 'bike', m: "Vespa / scooter style · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/2_b8140343-0c09-4064-9b95-feaf7207e06d.jpg?width=600", a: false },
  { t: "Kids Electric Motorcycle Ride-On Bike with 3 Wheels - Battery-Powered Toy for Boys & Girls Age 1-7 | Model JD-EM-402", p: "₹8,499", c: 'bike', m: "3 wheels · Battery operated · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/61jbRVww7bL._SL1500_1400x_a1d40d01-ac40-4031-9cb5-faffbf718cda.webp?width=600", a: true },
  { t: "Dual Seater Vespa Ride-On 12V scooterwith 3 Wheels Power for Children", p: "₹12,499", c: 'bike', m: "12V · Vespa / scooter style · 3 wheels", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Dual_seater_Kids_Vespa_3.webp?width=600", a: true },
  { t: "Vespa Matee Finish Kids Bike", p: "₹16,499", c: 'bike', m: "Vespa / scooter style · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Vespa_Kids_bike.jpg?width=600", a: true },
  { t: "Electric Motorcycle N-888 for Kids", p: "₹12,499", c: 'bike', m: "Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/KidsOnBikeR3.jpg?width=600", a: true },
  { t: "11CART Yamaha R7 Kids Electric Ride-On Bike", p: "₹12,499", c: 'bike', m: "Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_94d73e5e-b849-4270-b7c8-3a6b56a54698.jpg?width=600", a: true },
  { t: "R15 Kids Electric Ride-On Bike | 11CART", p: "₹12,499", c: 'bike', m: "Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/eCGsYQEtNjOlLyBPed.jpg?width=600", a: true },
  { t: "Kids Ride on Bike S1000RR Hand Accelerator Foot Brake Big Size", p: "₹13,499", c: 'bike', m: "Hand accelerator · Foot brake · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/products/2_03e47d76-db3a-441a-bb57-4eb9fd238272.webp?width=600", a: true },
  { t: "11CART Royal Enfield-Style Bullet Kids Electric Ride-On Bike", p: "₹14,499", c: 'bike', m: "Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/DglSejycaHreyyVAcX.jpg?width=600", a: true },
  { t: "Ducati Kids Motorcycle Children's Electric Motorcycle Ride On", p: "₹15,499", c: 'bike', m: "Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/H2391dd13a36a4f26b9bf5bbd054a319fL.jpg_720x720q50.webp?width=600", a: true },
  { t: "Electric Children's Bike 12V - DUO TRON", p: "₹16,499", c: 'bike', m: "12V · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/KidsBike_2.jpg?width=600", a: false },
  { t: "12V Kids Electric Motorcycle Bike with Training Wheels, Music & LED Lights - Ride-On Battery Bike for Boys & Girls Age 2-10 | Ducati Style by 11Cart", p: "₹14,499", c: 'bike', m: "12V · Training wheels · Battery operated", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/71s-O09vZRL_1400x_9285ae65-e102-436a-b4d6-4dbff2166ee4.webp?width=600", a: true },
  { t: "Harley-Style 12V Electric Ride-On Bike for Kids | 11cart", p: "₹16,499", c: 'bike', m: "12V · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/toys.tak_1748682000_3644519401411259611_50246883986.jpg?width=600", a: true },
  { t: "11Cart Big Size Kids Battery Operated Bike for Kids", p: "₹18,499", c: 'bike', m: "Battery operated · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Untitleddesign_3.jpg?width=600", a: true },
  { t: "BMW GS-Style Kids Adventure Bike | 11CART", p: "₹18,499", c: 'bike', m: "Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_f451d21a-73c7-404c-b685-e6c71bcc52cc.jpg?width=600", a: false },
  { t: "Battery Operated 12V BMW Police Bike for Kids | 11CART", p: "₹18,499", c: 'bike', m: "12V · Battery operated · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/SideStand_2.jpg?width=600", a: true },
  { t: "Premium Hayabusa Electric Ride-On Bike for Kids (2-11 Yrs) - 12V Battery, Real Engine Sound", p: "₹18,499", c: 'bike', m: "12V · Battery operated · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Pic_5.jpg?width=600", a: false },
  { t: "Kids Electric Motorcycle | 3 Wheels Motorcycle For Kids", p: "₹18,499", c: 'bike', m: "3 wheels · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Kidsbike.jpg?width=600", a: true },
  { t: "Kids Bike Big Size With Side Stand", p: "₹18,499", c: 'bike', m: "Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/EAE5AC94-3F17-4553-BD0A-39C99B8599CB.png?width=600", a: true },
  { t: "11CART Ultimate SuperSport Kids Electric Motorcycle", p: "₹20,499", c: 'bike', m: "Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_9cafa6f1-551c-4735-abb2-f9a9a3986c5a.jpg?width=600", a: true },
  { t: "11CART Ultimate Harley Cruiser Electric Motorcycle For Kids", p: "₹20,499", c: 'bike', m: "Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Green.png?width=600", a: true },
  { t: "11CART Harley Cruiser Edition - Powerful 12V Kids Electric Ride-On Bike", p: "₹20,499", c: 'bike', m: "12V · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/dexsKSZeidLitZiopy.jpg?width=600", a: false },
  { t: "Red BMW S1000RR Superbike for Kids with Rechargeable Battery", p: "₹13,499", c: 'bike', m: "Rechargeable · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/products/287c59eef12acce143db31f16babd8c6_1.jpg?width=600", a: true },
  { t: "Electric Motorcycle Children's Toy Rideable 12V Outdoor Riding Motorcycle BBF 900", p: "₹15,499", c: 'bike', m: "12V · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/bestkidsbikekidscarkidsjeep11cart_3.jpg?width=600", a: true },
  { t: "4-Wheel Compact Designed Battery Operated Motorbike for Kids", p: "₹10,499", c: 'bike', m: "Battery operated · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/products/image_46d77b96-ca19-42e7-91da-edf926478365.jpg?width=600", a: true },
  { t: "Kids Electric Harley Motorcycle 12V Ride on Bike | Kids Bike | BDL 1288", p: "₹13,499", c: 'bike', m: "12V · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/1_e81dacdc-eab3-4307-84ce-2f7bf6fd7eed.png?width=600", a: false },
  { t: "11Cart Ghost Rider Edition - New 12V Electric Ride-On Bike for Kids", p: "₹26,499", c: 'bike', m: "12V · Motorbike styling", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Untitleddesign.jpg?width=600", a: false },
  { t: "11CART 6V Premium Battery Charger for Kids Ride-On Cars, Bikes & Electric Toys", p: "₹289", c: 'parts', m: "Battery charger · 6V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/71jP0PSWbSL._SL1500_778f9242-7eb2-4c65-aa05-414621255c48.jpg?width=600", a: true },
  { t: "11CART 12V Universal Battery Charger for Kids Ride-On Cars, Bikes & Electric Toys", p: "₹339", c: 'parts', m: "Battery charger · 12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/jjdEbldgGSSVGFWhfN.jpg?width=600", a: true },
  { t: "12V and 6V Universal Remote for Kids Car (JR1922RXS/JR1822RXS/JR1858RXS/JR1810RXS)", p: "₹799", c: 'parts', m: "Remote control · 12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Toys-Car-Remote.jpg?width=600", a: true },
  { t: "12V Kids Ride-On Remote Control RX77 Motherboard Control Box", p: "₹1,099", c: 'parts', m: "Remote control · Control board · 12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Motherboard-Control-Box-Accessories.webp?width=600", a: false },
  { t: "12V Ride-On Car Remote - 2.4 GHz - Orange", p: "₹450", c: 'parts', m: "Remote control · 12V · 2.4 GHz", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Ride-on-Car-Remote.webp?width=600", a: false },
  { t: "12V YJ-ZK66D.PCB Multifunctional Central Control Panel", p: "₹1,199", c: 'parts', m: "Control board · 12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/patoys-12v-yj-zk66dpcb-multifunctional-central-control-panel-of-childrens-electric-ride-on-car-replacement-parts-patoys-patoys-730430.jpg?width=600", a: true },
  { t: "16MHz HH-619Y Bluetooth Remote for Kids Car", p: "₹799", c: 'parts', m: "Remote control · Bluetooth", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/51Xzd1ommLL._SX522.jpg?width=600", a: true },
  { t: "24V Power Charger for E-Bike", p: "₹1,299", c: 'parts', m: "Battery charger · 24V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/H8b8741af4af5442b91b6d647a91d9ca3I.jpg?width=600", a: false },
  { t: "3-Pin Charging Port for Hoverboards", p: "₹499", c: 'parts', m: "Charging port", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/Part_2.jpg?width=600", a: true },
  { t: "36V 500W Mini ATV Controller, 28A Electric Bike Brushless Motor Controller", p: "₹2,499", c: 'parts', m: "Control board · 36V · 500W", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/714wOsco4JL._SL1500.jpg?width=600", a: true },
  { t: "4-Pin Ignition Key Switch Set for Kids Battery Operated Car & Bike", p: "₹210", c: 'parts', m: "Ignition key switch", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/36-01.jpg?width=600", a: true },
  { t: "6 Plum 12V 17000RPM Gear Motor Complete Gear Box (High Speed)", p: "₹649", c: 'parts', m: "Motor & gear box · 12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/61UXSErRD3L._SL1500.jpg?width=600", a: true },
  { t: "6 Plum 12V-15000RPM Gear Motor Complete Gear Box", p: "₹999", c: 'parts', m: "Motor & gear box · 12V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/71a-oDMJSeL._SL1500.jpg?width=600", a: true },
  { t: "6 Plum 6V 17000RPM Gear Motor Complete Gear Box", p: "₹699", c: 'parts', m: "Motor & gear box · 6V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/61LlyYsol8L._SL1500_3a84aaeb-fc83-4c1c-aab0-ab32d56fa368.jpg?width=600", a: true },
  { t: "6 Plum 6V-15000RPM Gear Motor Complete Gear Box", p: "₹699", c: 'parts', m: "Motor & gear box · 6V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/61LlyYsol8L._SL1500_a5d47e7e-6b5d-4139-ae7c-fc135a36f926.jpg?width=600", a: true },
  { t: "6V & 12V Battery Operated Bike Hand Escalator Switch", p: "₹699", c: 'parts', m: "Accelerator switch · 6V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/ldUlcUiouZNKefkSlb.jpg?width=600", a: true },
  { t: "6V & 12V Battery Operated Car & Bike Escalator Switch", p: "₹99", c: 'parts', m: "Accelerator switch · 6V", i: "https://cdn.shopify.com/s/files/1/0019/7784/3785/files/61IuxphOlYL._SL1500.jpg?width=600", a: true },
].map((p, i) => ({
  id: i,
  title: p.t,
  price: p.p,
  category: p.c,
  meta: p.m,
  image: p.i,
  inStock: p.a
}));

function orderUrl(product) {
  const message = `Hi Sony Kids World! I am interested in: ${product.title}. Reference listed price: ${product.price}. Please confirm current stock, final price, compatibility/specifications and delivery.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('productSearch');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const loadMoreWrap = document.getElementById('loadMoreWrap');
const loadMoreButton = document.getElementById('loadMore');
const noResults = document.getElementById('noResults');
const catalogCount = document.getElementById('catalogCount');

let activeFilter = 'all';
let shown = PAGE_SIZE;

function matches(product, term) {
  if (activeFilter !== 'all' && product.category !== activeFilter) return false;
  return `${product.title} ${product.meta} ${categoryMeta[product.category].type}`.toLowerCase().includes(term);
}

function card(product) {
  const meta = categoryMeta[product.category];
  const stock = product.inStock
    ? '<span class="stock-badge in-stock" title="Listed as available"><i class="bi bi-check-circle-fill"></i> <span>In stock</span></span>'
    : '<span class="stock-badge on-request" title="Confirm availability on WhatsApp"><i class="bi bi-clock-fill"></i> <span>On request</span></span>';
  return `
    <div class="col-6 col-lg-3 product-item">
      <article class="product-card">
        <div class="product-image-wrap">
          <span class="product-tag ${meta.tagClass}">${meta.tag}</span>
          ${stock}
          <img src="${product.image}" alt="${escapeHtml(product.title)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${meta.fallback}'">
        </div>
        <div class="product-info">
          <div class="product-type">${meta.type}</div>
          <h3>${escapeHtml(product.title)}</h3>
          <div class="price-line"><strong>${product.price}</strong></div>
          <div class="product-meta"><span><i class="bi bi-info-circle"></i> ${escapeHtml(product.meta)}</span></div>
          <a class="btn btn-order w-100" href="${orderUrl(product)}" target="_blank" rel="noopener">Enquire on WhatsApp <i class="bi bi-whatsapp"></i></a>
        </div>
      </article>
    </div>`;
}

function renderProducts() {
  const term = (searchInput.value || '').trim().toLowerCase();
  const visible = products.filter(p => matches(p, term));

  grid.innerHTML = visible.slice(0, shown).map(card).join('');
  noResults.classList.toggle('d-none', visible.length !== 0);

  const remaining = visible.length - shown;
  loadMoreWrap.classList.toggle('d-none', remaining <= 0);
  if (remaining > 0) {
    loadMoreButton.textContent = `Load ${Math.min(remaining, PAGE_SIZE)} more rides`;
  }

  const byCategory = categoryMeta[activeFilter];
  const scope = activeFilter === 'all' ? 'across cars, bikes and replacement parts' : `in ${byCategory.scope}`;
  catalogCount.textContent = `${visible.length} product${visible.length === 1 ? '' : 's'} ${scope} · Prices and stock are indicative; confirm by WhatsApp before ordering.`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function resetAndRender() {
  shown = PAGE_SIZE;
  renderProducts();
}

filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  resetAndRender();
}));

searchInput.addEventListener('input', resetAndRender);

loadMoreButton.addEventListener('click', () => {
  shown += PAGE_SIZE;
  renderProducts();
});

document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => {
  const category = link.dataset.categoryLink;
  activeFilter = category;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === category));
  resetAndRender();
}));

document.getElementById('year').textContent = new Date().getFullYear();
renderProducts();
