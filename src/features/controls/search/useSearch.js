import { useDispatch, useSelector } from "react-redux"

import { selectSearch } from "../controls-selectors";
import { setSearch } from "../controls-slice"


export const useSearch = () => {

    const dispatch = useDispatch();
    const search = useSelector(selectSearch);

    const handleSearch = (e) => {
        dispatch(setSearch(e.target.value))
    }

    return [search, handleSearch];

}