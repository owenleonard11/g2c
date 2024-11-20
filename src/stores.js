import { writable } from "svelte/store";
import { Layer } from "$lib/utils";
export const currentLayer = writable(Layer.Home);