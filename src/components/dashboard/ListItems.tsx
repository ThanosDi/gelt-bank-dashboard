import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const mainListItems = (
    <ListItemButton>
        <ListItemIcon>
            <DashboardIcon color="info" />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
    </ListItemButton>
);
