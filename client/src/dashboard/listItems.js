import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttractionsIcon from '@mui/icons-material/Attractions';
import HotelIcon from '@mui/icons-material/Hotel';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ContactMailIcon from '@mui/icons-material/ContactMail';

export const mainListItems = (setCurrentView) => (
  <React.Fragment>
     <ListItemButton onClick={() => setCurrentView("itinerary")}>
      <ListItemIcon>
        <PlaylistAddCheckIcon />
      </ListItemIcon>
      <ListItemText primary="My Itinerary" />
    </ListItemButton>
     <ListItemButton onClick={() => setCurrentView("flights")}>
      <ListItemIcon>
        <AirplaneTicketIcon />
      </ListItemIcon>
      <ListItemText primary="Flights" />
    </ListItemButton>
    <ListItemButton onClick={() => setCurrentView("hotels")}>
      <ListItemIcon>
        <HotelIcon />
      </ListItemIcon>
      <ListItemText primary="Hotels" />
    </ListItemButton>
    <ListItemButton onClick={() => setCurrentView("attractions")}>
      <ListItemIcon>
        <AttractionsIcon />
      </ListItemIcon>
      <ListItemText primary="Attractions" />
    </ListItemButton>
    <ListItemButton onClick={() => setCurrentView("contact")}>
      <ListItemIcon>
        <ContactMailIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Us" />
    </ListItemButton>
  </React.Fragment>
);