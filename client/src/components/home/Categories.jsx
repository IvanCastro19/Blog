
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import useConnectionStatus from '../../hooks/hooks';
import { categories } from '../../constants/data';
import { useEffect, useState } from 'react';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
    
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;
    
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const [disabled, setDisabled] = useState(false);
    const isOnline = useConnectionStatus();
    const category = searchParams.get('category');

    useEffect(() => {
        setDisabled(!isOnline);
    },[isOnline]);
    
    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none', display: disabled ? "none" : "" }}>
                <StyledButton disabled={disabled} variant="contained">Create Blog</StyledButton>
            </Link>

            {disabled ? 
                <p>No Network detected</p> :

                <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { 
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>   
            }
        </>
    )
}

export default Categories;