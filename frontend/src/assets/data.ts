import type { Part } from "../types/part"

export const dummyParts: Part[] = [
    {
        id: "GHCA959",
        type: { id: "GCPT1", name: "Rear Cut", is_multi_purpose: false },
        position: { id: "GCPO1", position: "Rear" },
        names: "Rear Cut",
        children: ["GHCA9460", "GHCA9436"]
    },
    {
        id: "GHCA9460",
        type: { id: "GCPT2", name: "Tailboard Assembly", is_multi_purpose: false },
        position: { id: "GCPO2", position: "Tailboard" },
        names: "Tailboard Assembly",
        children: []
    },
    {
        id: "GHCA9436",
        type: { id: "GCPT3", name: "Rear Window Assembly", is_multi_purpose: false },
        position: { id: "GCPO3", position: "Rear Window" },
        names: "Rear Window Assembly",
        children: ["GHCA9429"]
    },
    {
        id: "GHCA9429",
        type: { id: "GCPT4", name: "Body Floor Structure", is_multi_purpose: false },
        position: { id: "GCPO4", position: "Body Floor" },
        names: "Body Floor Structure",
        children: []
    },
    {
        id: "GHCA8323",
        type: { id: "GCPT5", name: "Convertible Top Assembly", is_multi_purpose: false },
        position: { id: "GCPO5", position: "Convertible Top" },
        names: "Convertible Top Assembly",
        children: ["GHCA7584", "GHCA7567"]
    },
    {
        id: "GHCA7584",
        type: { id: "GCPT6", name: "Tailgate Assembly", is_multi_purpose: false },
        position: { id: "GCPO6", position: "Tailgate" },
        names: "Tailgate Assembly",
        children: []
    },
    {
        id: "GHCA7567",
        type: { id: "GCPT7", name: "Bumper (Rear)", is_multi_purpose: false },
        position: { id: "GCPO7", position: "Bumper" },
        names: "Bumper (Rear)",
        children: []
    },
    {
        id: "GHCA66",
        type: { id: "GCPT8", name: "Truck Bed Assembly", is_multi_purpose: false },
        position: { id: "GCPO8", position: "Truck Bed" },
        names: "Truck Bed Assembly",
        children: ["GHCA4308"]
    },
    {
        id: "GHCA4308",
        type: { id: "GCPT9", name: "Trunk Lid Assembly", is_multi_purpose: false },
        position: { id: "GCPO9", position: "Trunk Lid" },
        names: "Trunk Lid Assembly",
        children: []
    },
    {
        id: "GHCA3690",
        type: { id: "GCPT10", name: "Quarter Panel (Right Inner)", is_multi_purpose: false },
        position: { id: "GCPO10", position: "Right Inner" },
        names: "Quarter Panel (Right Inner)",
        children: ["GHCA3"]
    },
    {
        id: "GHCA3",
        type: { id: "GCPT11", name: "Quarter Panel (Left Inner)", is_multi_purpose: false },
        position: { id: "GCPO11", position: "Left Inner" },
        names: "Quarter Panel (Left Inner)",
        children: []
    },
    {
        id: "GHCA234",
        type: { id: "GCPT12", name: "Quarter Panel Reinforcement (Right Upper)", is_multi_purpose: false },
        position: { id: "GCPO12", position: "Right Upper" },
        names: "Quarter Panel Reinforcement (Right Upper)",
        children: []
    },
    {
        id: "GHCA21",
        type: { id: "GCPT13", name: "Rear Cut", is_multi_purpose: false },
        position: { id: "GCPO13", position: "Rear" },
        names: "Rear Cut",
        children: []
    },
    {
        id: "GHCA2",
        type: { id: "GCPT14", name: "Tailboard Assembly", is_multi_purpose: false },
        position: { id: "GCPO14", position: "Tailboard" },
        names: "Tailboard Assembly",
        children: []
    },
    {
        id: "GHCA7734",
        type: { id: "GCPT15", name: "Rear Window Assembly", is_multi_purpose: false },
        position: { id: "GCPO15", position: "Rear Window" },
        names: "Rear Window Assembly",
        children: []
    },
    {
        id: "GHCA7733",
        type: { id: "GCPT16", name: "Body Floor Structure", is_multi_purpose: false },
        position: { id: "GCPO16", position: "Body Floor" },
        names: "Body Floor Structure",
        children: []
    },
    {
        id: "GHCA7797",
        type: { id: "GCPT17", name: "Convertible Top Assembly", is_multi_purpose: false },
        position: { id: "GCPO17", position: "Convertible Top" },
        names: "Convertible Top Assembly",
        children: []
    },
    {
        id: "GHCA7684",
        type: { id: "GCPT18", name: "Tailgate Assembly", is_multi_purpose: false },
        position: { id: "GCPO18", position: "Tailgate" },
        names: "Tailgate Assembly",
        children: []
    },
    {
        id: "GHCA7512",
        type: { id: "GCPT19", name: "Bumper (Rear)", is_multi_purpose: false },
        position: { id: "GCPO19", position: "Bumper" },
        names: "Bumper (Rear)",
        children: []
    },
    {
        id: "GHCA7511",
        type: { id: "GCPT20", name: "Truck Bed Assembly", is_multi_purpose: false },
        position: { id: "GCPO20", position: "Truck Bed" },
        names: "Truck Bed Assembly",
        children: []
    }
];
