import React, { MouseEventHandler, ReactNode } from 'react';

import { Container, ButtonContainer, IconImage, ContainerButton } from './style';

interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    href?: string;
    target?: string;
    icon?: ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, href, target, onClick, icon, type = "button", disabled }) => {
    const isLink = !!href;

    if (isLink) {
        return (
            <Container href={href as string} target={target as string}>
                <ButtonContainer>
                    {icon && <IconImage>{icon}</IconImage>}
                    {children}
                </ButtonContainer>
            </Container>
        );
    } else {
        return (
            <ContainerButton type={type} onClick={onClick} disabled={disabled}>
                <ButtonContainer>
                    {icon && <IconImage>{icon}</IconImage>}
                    {children}
                </ButtonContainer>
            </ContainerButton>
        );
    }
}

export default Button;