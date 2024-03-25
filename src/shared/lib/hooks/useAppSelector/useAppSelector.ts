import { type TypedUseSelectorHook, useSelector } from "react-redux";

import { StoreSchema } from "@/app/providers/StoreProvider/config/types";

const useAppSelector: TypedUseSelectorHook<ReturnType<StoreSchema>> = useSelector;

export { useAppSelector };
