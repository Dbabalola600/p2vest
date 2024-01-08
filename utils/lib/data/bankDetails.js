import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { immer } from "zustand/middleware/immer";
import { produce } from 'immer'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBankStore = create(
    devtools(
        immer(
            persist(
                (set, get) => ({
                    bank: [],

                    addToBank: (Data) => set(produce((state) => {
                        state.bank.push(Data)
                    })),

                    removeFromBank: (index) => set(produce((state) => {
                        state.bank.splice(index, 1)
                    })),

                    updateBank: ({ index, updatedData }) => {
                        set(
                            produce((state) => {
                                state.bank[index] = { ...state.bank[index], ...updatedData };
                            })
                        );
                    },

                    clearBank: () =>
                        set(
                            produce((state) => {
                                state.bank = [];
                            })
                        ),
                }),
                {
                    name: 'bank-storage',
                    storage: {
                        async getItem(key) {
                            try {
                                const value = await AsyncStorage.getItem(key);
                                return value ? JSON.parse(value) : null;
                            } catch (error) {
                                console.error('AsyncStorage getItem error:', error);
                                return null;
                            }
                        },
                        async setItem(key, value) {
                            try {
                                await AsyncStorage.setItem(key, JSON.stringify(value));
                            } catch (error) {
                                console.error('AsyncStorage setItem error:', error);
                            }
                        },
                        async removeItem(key) {
                            try {
                                await AsyncStorage.removeItem(key);
                            } catch (error) {
                                console.error('AsyncStorage removeItem error:', error);
                            }
                        },
                    },

                }
            )
        )));
