import React, { useState, useEffect } from 'react';
import { Container, SideBarList, SideBarItem } from './style';
import HomeIcon from '@mui/icons-material/Home';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SavingsIcon from '@mui/icons-material/Savings';

const SideBar: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<string>(() => {
        return localStorage.getItem('selectedItem') || '';
      });

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
    };

    useEffect(() => {
        localStorage.setItem('selectedItem', selectedItem);
    }, [selectedItem]);

    return (
        <Container>
        <SideBarList>
            <SideBarItem href='/retailerHome' onClick={() => handleItemClick('Home')}>
                <hr style={{backgroundColor: selectedItem != 'Home' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Home' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <HomeIcon sx={{ color: selectedItem === 'Home' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Home' ? '#407BFF' : '#5C5F62' }}>Home</p>
            </SideBarItem>
            <SideBarItem href='/retailerProducts' onClick={() => handleItemClick('Products')}>
                <hr style={{backgroundColor: selectedItem != 'Products' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Products' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <LoyaltyIcon sx={{ color: selectedItem === 'Products' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Products' ? '#407BFF' : '#5C5F62' }}>Products</p>
            </SideBarItem>
            <SideBarItem href='/retailerScore' onClick={() => handleItemClick('Score')}>
                <hr style={{backgroundColor: selectedItem != 'Score' ? '#f5f5f5' : '#407BFF', border: selectedItem != 'Score' ? '1px solid #f5f5f5' : '1px solid #407BFF'}}></hr>
                <SavingsIcon sx={{ color: selectedItem === 'Score' ? '#407BFF' : '#5C5F62' }} />
                <p style={{ color: selectedItem === 'Score' ? '#407BFF' : '#5C5F62' }}>Score</p>
            </SideBarItem>
        </SideBarList>
        </Container>
    );
}

export default SideBar;





