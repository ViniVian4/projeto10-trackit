import BottomBar from "./BottomBar";
import TopBar from "./TopBar";

export default function PrivatePage ({children}) {
    return (
        <>
            <TopBar />
            {children}
            <BottomBar />
        </>
    )
}