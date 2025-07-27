import { useContext, useEffect } from "react";
import CarViewer from '../components/CarViewer';
import { PartContext } from "../context/PartContext";
import { dummyParts } from "../assets/data";
import type { Part } from "../types/part";

export default function HomePage() {
    const { defaultParts, setDefaultParts, initaliseDefaultParts } = useContext(PartContext);
    const USE_LOCAL_DATA = true;

    useEffect(() => {
        if (!USE_LOCAL_DATA) {
            initaliseDefaultParts();
        } else {
            setDefaultParts(dummyParts);
        }
    })

    const renderParts = (parts: Part[], level = 0) => {
        return parts.map(part => (
            <li key={part.id} style={{ marginLeft: `${level * 20}px` }}>
                {part.id} - {part.type.name} ({part.position.position})
                {part.children.length > 0 && (
                    <ul>
                        {renderParts(
                            defaultParts.filter(child => part.children.includes(child.id)),
                            level + 1
                        )}
                    </ul>
                )}
            </li>
        ));
    };

    return (
        <div>
            <h1>Home Page</h1>
            <div style={{ height: '50vh', width: '100vw' }}>
                <CarViewer />
            </div>
            {(defaultParts ? (
                <ul>
                    {renderParts(defaultParts)}
                </ul>
            ) : (
                <p>Loading...</p>
            )
            )}
        </div >
    );
}