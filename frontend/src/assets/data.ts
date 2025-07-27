import type { Part } from "../types/part"

export const dummyParts: Part[] = [
    {
        id: "GHCA959",
        type: { id: "GCPT1", name: "Rear Cut", is_multi_purpose: false },
        position: { id: "GCPO1", position: "Rear" },
        names: "Rear Cut",
        children: ["GHCA9460", "GHCA9436"],
        representation: {
            examples: [
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/1532cf96-6862-8008-8a95-dc691577d510",
                    "description": ""
                },
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/1532cf96-6862-805f-bd19-c333b11ae500",
                    "description": ""
                }
            ]
        }
    },
    {
        id: "GHCA9460",
        type: { id: "GCPT2", name: "Tailboard Assembly", is_multi_purpose: false },
        position: { id: "GCPO2", position: "Tailboard" },
        names: "Tailboard Assembly",
        children: [],
        parent: "GHCA959"
    },
    {
        id: "GHCA9436",
        type: { id: "GCPT3", name: "Rear Window Assembly", is_multi_purpose: false },
        position: { id: "GCPO3", position: "Rear Window" },
        names: "Rear Window Assembly",
        children: ["GHCA9429"],
        parent: "GHCA959"
    },
    {
        id: "GHCA9429",
        type: { id: "GCPT4", name: "Body Floor Structure", is_multi_purpose: false },
        position: { id: "GCPO4", position: "Body Floor" },
        names: "Body Floor Structure",
        children: [],
        parent: "GHCA9436",
        representation: {
            examples: [
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/1b32cf96-6862-80f1-96bb-f268377849d7",
                    "description": ""
                },
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/1b32cf96-6862-8044-afef-e813fc153dff",
                    "description": ""
                }
            ]
        },
    },
    {
        id: "GHCA8323",
        type: { id: "GCPT5", name: "Convertible Top Assembly", is_multi_purpose: false },
        position: { id: "GCPO5", position: "Convertible Top" },
        names: "Convertible Top Assembly",
        children: ["GHCA7584", "GHCA7567"],
        representation: {
            examples: [
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/1b32cf96-6862-80f1-96bb-f268377849d7",
                    "description": ""
                },
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/1b32cf96-6862-8044-afef-e813fc153dff",
                    "description": ""
                }
            ]
        }
    },
    {
        id: "GHCA7584",
        type: { id: "GCPT6", name: "Tailgate Assembly", is_multi_purpose: false },
        position: { id: "GCPO6", position: "Tailgate" },
        names: "Tailgate Assembly",
        children: [],
        parent: "GHCA8323"
    },
    {
        id: "GHCA7567",
        type: { id: "GCPT7", name: "Bumper (Rear)", is_multi_purpose: false },
        position: { id: "GCPO7", position: "Bumper" },
        names: "Bumper (Rear)",
        children: [],
        parent: "GHCA8323"
    },
    {
        id: "GHCA66",
        type: { id: "GCPT8", name: "Truck Bed Assembly", is_multi_purpose: false },
        position: { id: "GCPO8", position: "Truck Bed" },
        names: "Truck Bed Assembly",
        children: ["GHCA4308"],
        representation: {
            examples: [
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/14f2cf96-6862-8001-8751-ed25b9357c62",
                    "description": ""
                },
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/14f2cf96-6862-80e7-a055-f35c061816c1",
                    "description": ""
                },
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/14f2cf96-6862-803c-adb2-fdf555829d94",
                    "description": ""
                }
            ]
        },
    },
    {
        id: "GHCA4308",
        type: { id: "GCPT9", name: "Trunk Lid Assembly", is_multi_purpose: false },
        position: { id: "GCPO9", position: "Trunk Lid" },
        names: "Trunk Lid Assembly",
        children: [],
        parent: "GHCA66"
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
        children: [],
        parent: "GHCA3690",
        representation: {
            examples: [
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/1b32cf96-6862-80b2-9aa7-f8ec7f958e40",
                    "description": ""
                },
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/1b32cf96-6862-8011-9afb-fe231958870b",
                    "description": ""
                },
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/1b32cf96-6862-8044-8648-c99e39a1eec0",
                    "description": ""
                },
                {
                    "image_url": "https://cdn.partly.com/c/uploads/gapc/1b32cf96-6862-8038-90d3-f93758e056e1",
                    "description": ""
                }
            ]
        }
    },
];
