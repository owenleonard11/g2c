import { writable } from "svelte/store";
import { Layer } from "$lib/types";
export const currentLayer = writable(Layer.Home);