import { useState } from "react"
import { CommandType } from "../lib/commands"


export const useComplexCommand = (commands: CommandType[], defaultSelected?: string) => {
    console.log("this is default selected", defaultSelected)
    const [selected, setSelected] = useState<string>(defaultSelected ?? commands[0].name ?? "")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const onClose = (newSelectedValue?: string) => {
        if (newSelectedValue) {
            setSelected(newSelectedValue)
        }
        setIsOpen(false);
    }

    const onChange = (newSelectedValue: string) => {
        setSelected(newSelectedValue)
        const command = commands.find(command => command.name===newSelectedValue)
        if (command) {
            command.command()
        }
    }

    const toggleDropdown = () => {
        setIsOpen(prev => !prev)
    }

    return {
        selected,
        isOpen,
        onClose,
        onChange,
        toggleDropdown
    }
}