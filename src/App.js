import React, { useReducer, useState } from "react";
import "./App.css";

const accordionReducer = (state, action) => {
    if (action.type === "TOGGLE") {
        return state.map((item) =>
            item.id === action.id ? { ...item, open: !item.open } : item
        );
    } else if (action.type === "EDIT") {
        return state.map((item) =>
            item.id === action.id ? { ...item, text: action.text } : item
        );
    } else if (action.type === "DELETE") {
        return state.filter((item) => item.id !== action.id);
    } else if (action.type === "ADD") {
        return [
            ...state,
            {
                id: Date.now(),
                text: action.text,
                open: false,
            },
        ];
    } else {
        return state;
    }
};

function App() {
    const [items, dispatch] = useReducer(accordionReducer, []);
    const [newItemText, setNewItemText] = useState("");
    const [filterText] = useState("");

    const handleAddItem = () => {
        if (newItemText.trim()) {
            dispatch({ type: "ADD", text: newItemText });
            setNewItemText("");
        }
    };

    const handleEditItem = (id) => {
        const newText = prompt("New text:");
        if (newText) {
            dispatch({ type: "EDIT", id, text: newText });
        }
    };

    const handleDeleteItem = (id) => {
        dispatch({ type: "DELETE", id });
    };

    const toggleAccordion = (id) => {
        dispatch({ type: "TOGGLE", id });
    };

    const filteredItems = items.filter((item) =>
        item.text.includes(filterText.toLowerCase())
    );

    return (
        <div className="App">
            <h1>Accordion</h1>

            <div>
                <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="New Text"
                />
                <button onClick={handleAddItem}>Add</button>
            </div>

            <div>
                {filteredItems.map((item) => (
                    <div key={item.id} className="accordion-item">
                        <div
                            className="accordion-header"
                            onClick={() => toggleAccordion(item.id)}
                        >
                            <h2>{item.text}</h2>
                        </div>

                        {item.open && (
                            <div className="accordion-content">
                                <button onClick={() => handleEditItem(item.id)}>
                                    EDIT
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(item.id)}
                                >
                                    DELETE
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
