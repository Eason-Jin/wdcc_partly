import { useContext } from "react";
import CarViewer from '../components/CarViewer';
import { PartContext } from "../context/PartContext";

export default function HomePage() {
    const { defaultParts } = useContext(PartContext);
    const USE_LOCAL_DATA = true;
    const local_parts = [
        "GHCA959 - Rear Cut (N/A)",
        "GHCA8323 - Tailboard Assembly (N/A)",
        "GHCA66 - Rear Window Assembly (N/A)",
        "GHCA4308 - Body Floor Structure (N/A)",
        "GHCA3690 - Convertible Top Assembly (N/A)",
        "GHCA3 - Tailgate Assembly (N/A)",
        "GHCA234 - Bumper (Rear)",
        "GHCA21 - Truck Bed Assembly (N/A)",
        "GHCA2 - Trunk Lid Assembly (N/A)",
        "GHCA7797 - Quarter Panel (Right Inner)",
        "GHCA7684 - Quarter Panel (Left Inner)",
        "GHCA7512 - Quarter Panel Reinforcement (Right Upper)"
    ]

    return (
        <div>
            <h1>Home Page</h1>
            <div style={{ height: '50vh', width: '100vw' }}>
                <CarViewer />
            </div>
            {USE_LOCAL_DATA ? (
                <ul>
                    {local_parts.map(part => (
                        <li key={part}>{part}</li>
                    ))}
                </ul>
            ) : (
                defaultParts ? (
                    <ul>
                        {defaultParts
                            .filter(part => part.type.name !== "N/A")
                            .map(part => (
                                <li key={part.id}>
                                    {part.id} - {part.type.name} ({part.position.position})
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )
            )}
        </div >
    );
}