import { Box, FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { CommandType } from "../lib/commands";


interface CommandProps {
    name: string;
    command: () => void;
    disabled: () => boolean;
    isActive: () => boolean;
    icon?: ReactElement;
}

export const Command = (props: CommandProps) => {

    const onClick = () => {
        props.command()
    }

    return (
        <Box>
            <IconButton
                onClick={() => onClick()}
                disabled={props.disabled()}
                color={props.isActive() ? 'primary' : 'default'}
            >
                <Tooltip title={props.name}>
                    {props.icon ?? <Typography>{props.name}</Typography>}
                </Tooltip>
            </IconButton>
        </Box>
    )
}



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




interface GroupCommandDropDownProps {
    commands: CommandType[];
    defaultSelected: string;
} 


export const GroupCommandDropDown = (props: GroupCommandDropDownProps) => {

    const { selected, isOpen, onClose, onChange, toggleDropdown } = useComplexCommand(props.commands, props.defaultSelected)
    /**We want to have a Select dropdown with autowidth and default to props.selected. The children should be Command buttons. Clicking on a button should 
     * run that command, change selected, and close the dropdown.
     */

    const onSelectChange = (event: SelectChangeEvent) => {
        const commandName = event.target.value
        onChange(commandName);
        onClose();
    }

    return (
        <Box className={`groupCommandDropDown-${selected}`}>
            <FormControl>
                <Select
                    value={selected}
                    onChange={onSelectChange}
                    // open={isOpen}
                >
                    {props.commands.map(command => {
                        return (
                            <MenuItem value={command.name}>
                                {command.icon}
                                {command.name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}