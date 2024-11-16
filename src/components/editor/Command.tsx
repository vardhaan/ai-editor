import "../../styles/command.css"

import { Box, FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { CommandType } from "../../lib/commands";
import { useComplexCommand } from "../../hooks/useComplexCommand";



interface CommandContainerProps {
    command: CommandType;
    Popper?: ReactElement;
    onCommandClick?: () => void;
}

export const CommandContainer = (props: CommandContainerProps) => {

    const {name, command, disabled, isActive, icon} = props.command;

    /**We need the commmand container to handle the running of stuff. The og Command component now is just a Button. */
    const onButtonClick = () => {
        command();
        if (props.onCommandClick) {
            console.log("should be firing!")
            props.onCommandClick();
        }
    }

    return (
        <Box>
            <CommandButton 
                name={name}
                onClick={onButtonClick}
                disabled={disabled()}
                isActive={isActive()}
                icon={icon}
            />
        </Box>
    )
}



interface CommandButtonProps {
    name: string;
    onClick: () => void;
    disabled: boolean;
    isActive: boolean;
    icon?: ReactElement;
}

export const CommandButton = (props: CommandButtonProps) => {


    return (
        <Box>
            <IconButton
                onClick={() => props.onClick()}
                disabled={props.disabled}
                color={props.isActive ? 'primary' : 'default'}
            >
                <Tooltip title={props.name}>
                    {props.icon ?? <Typography>{props.name}</Typography>}
                </Tooltip>
            </IconButton>
        </Box>
    )
}


interface GroupCommandDropDownProps {
    commands: CommandType[];
    defaultSelected: string;
    width?: string;
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
        <Box className="groupCommandDropDown">
            <FormControl variant="standard">
                <Select
                    value={selected}
                    onChange={onSelectChange}
                    className="groupCommandSelect"
                    sx={{ width: props.width }}
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