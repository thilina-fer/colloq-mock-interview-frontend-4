// // src/services/InterviewerService.js
// import axios from "axios";

// const API_BASE_URL = "http://localhost:8080/api/v1/interviewer";

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Request Interceptor: Token එක auto attach කිරීමට
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const InterviewerService = {
//   // 1. Profile එක සම්පූර්ණ කිරීම (Register වෙද්දී)
//   completeProfile: async (profileData, imageFile) => {
//     try {
//       const formData = new FormData();
//       formData.append(
//         "data",
//         new Blob([JSON.stringify(profileData)], { type: "application/json" }),
//       );

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       const response = await apiClient.post(
//         "/complete-interviewer-profile",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       throw error.response ? error.response.data : new Error("Network Error");
//     }
//   },

//   // 2. Profile එක UPDATE කිරීම (Dashboard එකේදී) - මේක තමයි ඔයාට අඩු වෙලා තිබුණේ!
//   updateProfile: async (profileData, imageFile) => {
//     try {
//       const formData = new FormData();

//       // JSON දත්ත ටික Blob එකක් ලෙස එකතු කිරීම
//       formData.append(
//         "data",
//         new Blob([JSON.stringify(profileData)], { type: "application/json" }),
//       );

//       // පින්තූරයක් තිබේ නම් එය එකතු කිරීම
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       // Backend එකේ අපි හැදුවේ @PutMapping එකක් නිසා මෙතන .put විය යුතුයි
//       const response = await apiClient.put("/update-profile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return response.data;
//     } catch (error) {
//       throw error.response ? error.response.data : new Error("Network Error");
//     }
//   },

//   // Profile දත්ත ලබා ගැනීම
//   getProfile: async () => {
//     try {
//       const response = await apiClient.get("/profile");
//       return response.data;
//     } catch (error) {
//       throw error.response ? error.response.data : new Error("Network Error");
//     }
//   },
// };

// src/services/InterviewerService.js
import axios from "axios";

// 🎯 Base URL එක මෙතනින් නවත්තන්න
const API_BASE_URL = "http://localhost:8080/api/v1/interviewer";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor එක හරහා Token එක හැම Request එකකටම auto එකතු වෙනවා
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const InterviewerService = {
  // 1. Complete profile (Registration Modal එකේදී)
  completeProfile: async (profileData, imageFile) => {
    const formData = new FormData();

    // JSON දත්ත Blob එකක් ලෙස (Backend එකේ @RequestPart("data") සඳහා)
    const jsonBlob = new Blob([JSON.stringify(profileData)], {
      type: "application/json",
    });
    formData.append("data", jsonBlob);

    if (imageFile) {
      formData.append("image", imageFile); // Backend එකේ @RequestPart("image") සඳහා
    }

    // 🎯 සටහන: baseURL එකේ දැනටමත් /api/v1/interviewer තියෙන නිසා මෙතන දෙන්න ඕනේ ඉතිරි කොටස විතරයි
    const response = await apiClient.post(
      "/complete-interviewer-profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  // 2. Update existing profile
  updateProfile: async (profileData, imageFile) => {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(profileData)], {
      type: "application/json",
    });
    formData.append("data", jsonBlob);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await apiClient.put("/update-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // 3. Fetch interviewer profile details
  getProfile: async () => {
    const response = await apiClient.get("/profile");
    return response.data;
  },
};

export default InterviewerService;
