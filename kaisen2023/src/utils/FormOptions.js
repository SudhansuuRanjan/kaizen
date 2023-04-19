const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const collegeOptions = [
  {
    value: "AIIMS Patna ",
    label: " AIIMS Patna"
  },
  {
    value: "AIIMS Delhi",
    label: "AIIMS Delhi"
  },
  {
    value: "AIIMS Bhopal",
    label: "AIIMS Bhopal"
  },
  {
    value: "AIIMS Bhubaneswar",
    label: "AIIMS Bhubaneswar"
  },
  {
    value: "AIIMS Jodhpur",
    label: "AIIMS Jodhpur"
  },
  {
    value: "AIIMS Rishikesh",
    label: "AIIMS Rishikesh"
  },
  {
    value: "AIIMS Raipur",
    label: "AIIMS Raipur"
  },
  {
    value: "AIIMS Kalyani",
    label: "AIIMS Kalyani"
  },
  {
    value: "AIIMS Nagpur",
    label: "AIIMS Nagpur"
  },
  {
    value: "AIIMS Gorakhpur",
    label: "AIIMS Gorakhpur"
  },
  {
    value: "AIIMS Deoghar",
    label: "AIIMS Deoghar"
  },
  {
    value: "AIIMS Raebarelli",
    label: "AIIMS Raebarelli"
  },
  {
    value: "AIIMS Bibinagar",
    label: "AIIMS Bibinagar"
  },
  {
    value: "AIIMS Bathinda",
    label: "AIIMS Bathinda"
  },
  {
    value: "AIIMS Jammu",
    label: "AIIMS Jammu"
  },
  {
    value: "AIIMS Telangana",
    label: "AIIMS Telangana"
  },
  {
    value: "AIIMS Mangalagiri",
    label: "AIIMS Mangalagiri"
  },
  {
    value: "JIPMER Puducherry",
    label: "JIPMER Puducherry"
  },
  {
    value: "JIPMER Karikal",
    label: "JIPMER Karikal"
  },
  {
    value: "BHU",
    label: "BHU"
  },
  {
    value: "KGMU",
    label: "KGMU"
  },
  {
    value: "PMCH",
    label: " PMCH"
  },
  {
    value: "IGIMS",
    label: "IGIMS"
  },
  {
    value: "NMCH",
    label: "NMCH"
  },
  {
    value: "SKMCH Muzaffarpur",
    label: "SKMCH Muzaffarpur"
  },
  {
    value: "B.M.I.M.S Pawapuri",
    label: "B.M.I.M.S Pawapuri"
  },
  {
    value: "A.N.M.M Gaya",
    label: "A.N.M.M Gaya"
  },
  {
    value: "Madhubani Medical college",
    label: "Madhubani Medical college"
  },
  {
    value: "DMCH Darbhanga",
    label: "DMCH Darbhanga"
  },
  {
    value: "JNMC Bhagalpur",
    label: "JNMC Bhagalpur"
  },
  {
    value: "GMC Bettiah",
    label: "GMC Bettiah"
  },
  {
    value: "JKTMCH Madhepura",
    label: "JKTMCH Madhepura"
  },
  {
    value: "ESIC",
    label: "ESIC"
  },
  {
    value: "NSMCH",
    label: "NSMCH"
  },
  {
    value: "Katihar Medical college",
    label: "Katihar Medical college"
  },
  {
    value: "Narayan Medical college",
    label: "Narayan Medical college"
  },
  {
    value: "Madhubani Medical college",
    label: "Madhubani Medical college"
  },
  {
    value: "LBKMCH Saharsa",
    label: "LBKMCH Saharsa"
  },
  {
    value: "IIT Patna",
    label: "IIT Patna"
  },
  {
    value: "NIT Patna",
    label: "NIT Patna"
  },
  {
    value: "BIT Patna",
    label: "BIT Patna"
  },
  {
    value: "NIFT",
    label: "NIFT"
  },
  {
    value: "Amity University",
    label: "Amity University"
  },
  {
    value: "Patna Women college",
    label: "Patna Women college"
  },
  {
    value: "JD Women college",
    label: "JD Women college"
  },
  {
    value: "Magadh Mahila college",
    label: "Magadh Mahila college"
  },
  {
    value: "CNLU",
    label: "CNLU"
  },
  {
    value: "NSIT",
    label: "NSIT"
  },
  {
    value: "Buddha Dental college",
    label: "Buddha Dental college"
  },
  {
    value: "Patna Dental college",
    label: "Patna Dental college"
  },
  {
    value: "BR Ambedkar Dental Science",
    label: "BR Ambedkar Dental Science"
  },
  {
    value: "Bihar Vetenary college",
    label: "Bihar Vetenary College"
  },
  {
    value: "Bihar Ayurvedic college",
    label: "Bihar Ayurvedic college"
  }
];

const yearOptions = [
  { value: "First", label: "First" },
  { value: "Second", label: "Second" },
  { value: "Third", label: "Third" },
  { value: "Fourth", label: "Fourth" },
  { value: "Fifth", label: "Fifth" },
];

const courseOptions = [
  { value: "MBBS", label: "MBBS" },
  { value: "BDS", label: "BDS" },
  { value: "BTech", label: "BTech" },
  { value: "BAMS", label: "BAMS" },
  { value: "BHMS", label: "BHMS" },
  { value: "BSc", label: "BSc" },
  { value: "BPharm", label: "BPharm" },
  { value: "BCom", label: "BCom" },
  { value: "BA", label: "BA" },
  { value: "BSc", label: "BSc" },
  { value: "BBA", label: "BBA" },
  { value: "BCA", label: "BCA" },
  { value: "BArch", label: "BArch" },
  { value: "BDes", label: "BDes" },
  { value: "BPlan", label: "BPlan" },
  { value: "BSW", label: "BSW" },
  { value: "LLB", label: "LLB" },
  { value: "MBA", label: "MBA" },
  { value: "MSc", label: "MSc" },
  { value: "MTech", label: "MTech" },
  { value: "MCom", label: "MCom" },
  { value: "MA", label: "MA" },
  { value: "MSW", label: "MSW" },
  { value: "MPhil", label: "MPhil" },
  { value: "PhD", label: "PhD" },
  { value: "other", label: "Other" },
];

export { genderOptions, collegeOptions, yearOptions, courseOptions };
