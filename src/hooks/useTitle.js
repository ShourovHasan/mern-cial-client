import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Merncial`;
    }, [title])
};

export default useTitle;