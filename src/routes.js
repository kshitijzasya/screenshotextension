import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Pages from "./pages";

const { Main } = Pages;

export default () => (
    <Router>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<Main />} />
        </Routes>
    </Router>
)

