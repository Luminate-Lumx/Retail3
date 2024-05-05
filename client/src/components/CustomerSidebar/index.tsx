import React, { useState, useEffect } from 'react';
import { Container, SideBarList, SideBarItem } from './style';
import HomeIcon from '@mui/icons-material/Home';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SavingsIcon from '@mui/icons-material/Savings';

const CustomerSidebar: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<string>(() => {
        return localStorage.getItem('selectedCustomerItem') || '';
      });

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
    };

    useEffect(() => {
        localStorage.setItem('selectedCustomerItem', selectedItem);
    }, [selectedItem]);

    return (
        <Container>
        <SideBarList>
            <SideBarItem href='/customerHome' onClick={() => handleItemClick('Home')}>
                <hr style={{backgroundColor: selectedItem != 'Home' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Home' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <HomeIcon sx={{ color: selectedItem === 'Home' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Home' ? '#407BFF' : '#5C5F62' }}>Home</p>
            </SideBarItem>
            <SideBarItem href='/customerBuy' onClick={() => handleItemClick('Buy')}>
                <hr style={{backgroundColor: selectedItem != 'Buy' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Buy' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <LoyaltyIcon sx={{ color: selectedItem === 'Buy' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Buy' ? '#407BFF' : '#5C5F62' }}>Buy</p>
            </SideBarItem>
            <SideBarItem href='/customerScore' onClick={() => handleItemClick('Score')}>
                <hr style={{backgroundColor: selectedItem != 'Score' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Score' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <SavingsIcon sx={{ color: selectedItem === 'Score' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Score' ? '#407BFF' : '#5C5F62' }}>Score</p>
            </SideBarItem>
        </SideBarList>
        </Container>
    );
}

export default CustomerSidebar;





