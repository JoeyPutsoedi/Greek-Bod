import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/api.js";

const useUserStore = create();
