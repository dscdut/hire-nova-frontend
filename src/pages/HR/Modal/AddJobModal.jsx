"use client"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function AddJobModal() {
    const [criteria, setCriteria] = useState([
        { name: "", weight: "", detail: "" }
    ])

    const addCriterion = () => {
        setCriteria([...criteria, { name: "", weight: "", detail: "" }])
    }

    const updateCriterion = (index, field, value) => {
        const updated = [...criteria]
        updated[index][field] = value
        setCriteria(updated)
    }

    const handleSubmit = () => {
        // TODO: Handle form submission logic
        console.log("Form submitted!")
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto">Add New Job</Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Job</DialogTitle>
                    <DialogDescription>
                        Please fill out the information to create a new job post.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full border px-3 py-2 rounded"
                    />

                    <div className="flex gap-2">
                        <select className="flex-1 border px-3 py-2 rounded">
                            <option value="">Level</option>
                            <option value="Intern">Intern</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Time"
                            className="flex-1 border px-3 py-2 rounded"
                        />
                    </div>

                    <select className="w-full border px-3 py-2 rounded">
                        <option value="">Salary Range</option>
                        <option value="0-500">$0 - $500</option>
                        <option value="500-1000">$500 - $1000</option>
                    </select>

                    <textarea
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Job Description"
                        rows={4}
                        defaultValue={`Google Developer Student Clubs (GDSC) is a global program by Google Developers for technology-enthusiastic students at universities, colleges, and other educational institutions.

Proud to be one of the GDSC chapters, Google Developer Student Club - Danang University of Science and Technology.`}
                    ></textarea>

                    <div className="mt-4">
                        <h3 className="font-semibold mb-2 text-lg">Scoring Criteria and Weights</h3>
                        {criteria.map((c, idx) => (
                            <div key={idx} className="mb-4 space-y-2 border p-3 rounded">
                                <input
                                    type="text"
                                    placeholder="Criterion name"
                                    className="w-full border px-3 py-2 rounded"
                                    value={c.name}
                                    onChange={(e) => updateCriterion(idx, "name", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Weight"
                                    className="w-full border px-3 py-2 rounded"
                                    value={c.weight}
                                    onChange={(e) => updateCriterion(idx, "weight", e.target.value)}
                                />
                                <textarea
                                    placeholder="Details"
                                    className="w-full border px-3 py-2 rounded"
                                    rows={2}
                                    value={c.detail}
                                    onChange={(e) => updateCriterion(idx, "detail", e.target.value)}
                                />
                            </div>
                        ))}

                        <div className="flex justify-between mt-2">
                            <Button variant="outline" onClick={addCriterion}>
                                + Add Criterion
                            </Button>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}