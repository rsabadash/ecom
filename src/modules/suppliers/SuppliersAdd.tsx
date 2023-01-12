import {useCachedAPI} from "../../hooks";
import {endpoint} from "../../common/constants/api";
import {Supplier} from "./types";

const SuppliersAdd = () => {
    const { data = [] } = useCachedAPI<Supplier[]>(endpoint.suppliers);

    return (
        <>SuppliersAdd</>
    )
}

export default SuppliersAdd