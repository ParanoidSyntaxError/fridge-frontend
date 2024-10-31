'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// This would typically come from an API or database
const allSuggestions = [
    "$FRIDGE Chart", "Telegram", "DEX Screener", "X"
]

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const suggestionRef = useRef<HTMLUListElement>(null)

    const handleSelection = (selectedItem: string) => {
        console.log(`Selected: ${selectedItem}`)
        // Here you would typically do something with the selected item,
        // such as navigating to a new page or updating the app state
        setQuery(selectedItem)
        setIsOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && suggestions.length > 0) {
            e.preventDefault() // Prevent form submission
            handleSelection(suggestions[0])
        }
    }

    useEffect(() => {
        if (query.length > 0) {
            const filteredSuggestions = allSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(query.toLowerCase())
            )
            setSuggestions(filteredSuggestions)
        } else {
            setSuggestions(allSuggestions)
        }
    }, [query])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleInputFocus = () => {
        setIsOpen(true)
        setSuggestions(allSuggestions)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (suggestions.includes(query)) {
            handleSelection(query)
        } else {
            console.log("Invalid selection")
            // Here you might want to show an error message to the user
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
            <div className="relative">
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputFocus}
                    className="pl-4 pr-10 rounded-full"
                    aria-label="Search"
                    aria-autocomplete="list"
                    aria-controls="suggestions-list"
                    aria-expanded={isOpen}
                />
                <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full rounded-r-full"
                    aria-label="Submit search"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </div>
            {isOpen && suggestions.length > 0 && (
                <ul
                    ref={suggestionRef}
                    id="suggestions-list"
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                    role="listbox"
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelection(suggestion)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center"
                            role="option"
                        >
                            <Search className="h-4 w-4 mr-2 text-gray-400" />
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    )
}