import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { ReactElement } from "react";


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