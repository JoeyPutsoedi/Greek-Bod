import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/api.js";

const useUserStore = create(
  persist(
    (set) => ({
      //set initialState-----------------------------------------------------------
      user: null,
      error: null,
      token: null,

      //actions--------------------------------------------------------------------

      //signUp User----------------------------------------------------------------------------------
      signUpUser: async ({ email, password, firstName, lastName }) => {
        try {
          //send signup request to backend server
          const res = await api.post("/user/signup", {
            email,
            password,
            firstName,
            lastName,
          });

          //if the request was successful then set user state to the response data
          if (res.data) {
            set({
              user: res.data.user,
              token: res.data.token,
              error: null,
            });

            //return res.data for usability
            return res.data;
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.error ||
            err.message ||
            "Failed to sign up user!!!";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      //login User-----------------------------------------------------------------------------------
      loginUser: async ({ email, password }) => {
        try {
          //send a login request to the backend api
          const res = await api.post("/user/login", { email, password });

          //if request is successful then set user to the response data
          if (res.data) {
            set({
              user: res.data.user,
              token: res.data.token,
              error: null,
            });

            //return res.data for usability
            return res.data;
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.error ||
            err.message ||
            "Failed to login user!!!";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      //fetch user details---------------------------------------------------------------------------
      fetchUserInfo: async (id) => {
        try {
          const res = await api.get(`/user/profile/${id}`);
          if (res.data) {
            set({
              user: res.data,
              error: null,
            });
            return res.data;
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.error || err.message || "User not found!!!";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      //update/set user details
      updateUserInfo: async (id, updatedData) => {
        try {
          const res = await api.patch(`/user/profile/${id}`, updatedData);

          if (res.data) {
            set({
              user: res.data,
              error: null,
            });
            return res.data;
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.error ||
            err.message ||
            "Failed to update user!!!";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        }
      },
      uploadImage: async (id, formData) => {
        try {
          const res = await api.patch(`/user/profilePicture/${id}`, formData);

          if (res.data) {
            set({
              user: res.data.user,
              error: null,
            });
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.error ||
            err.message ||
            "Failed to update user!!!";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        }
      },
      updateMealStatus: async (id, updatedData) => {
        try {
          const res = await api.patch(`/user/mealStatus/${id}`, updatedData);

          if (res.data) {
            set({
              user: res.data,
              error: null,
            });
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.error ||
            err.message ||
            "Failed to update meal status!!!";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        }
      },
      fetchMeals: async (id) => {
        try {
          const res = await api.patch(`/user/fetchMeals/${id}`);

          if (res.data) {
            return res.data.meals;
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.error ||
            err.message ||
            "Failed to update meal status!!!";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        }
      },
      signOutUser: () => set({ user: null, token: null, error: null }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
