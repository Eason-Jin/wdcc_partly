import { useContext } from "react";
import CarViewer from '../components/CarViewer';
import { PartContext } from "../context/PartContext";

export default function HomePage() {
    const { defaultParts } = useContext(PartContext);

    return (
        <div>
            <h1>Home Page</h1>
            <div style={{ height: '50vh', width: '100vw' }}>
                <CarViewer />
            </div>
            {defaultParts ? (
                <ul>
                    {defaultParts.map(part => (
                        <li key={part.id}>
                            {part.id} - {part.type.name} ({part.position.position})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}