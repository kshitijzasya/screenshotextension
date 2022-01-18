import React from "react";
import { Button } from "react-bootstrap";
import { screenCapture } from "../util/capture";

//Capture the area on the screen
function captureArea() {
    screenCapture();
}

//main screen area
const Main = () => {
    return (
        <>
            <div className="container md:container mx-auto px-15 py-5">
                <div className="App">
                    <header className="App-header text-center">
                        <p>
                            <Button className="btn" variant="primary" onClick={captureArea}>Capture screen</Button>
                        </p>
                    </header>
                </div>
            </div>
        </>
    );
}

export default Main;