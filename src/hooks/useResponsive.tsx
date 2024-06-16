import { useMediaQuery } from 'react-responsive';

const useResponsive = () => {
    const isMobile = useMediaQuery({
        maxWidth: '639px',
    });

    const isTablet = useMediaQuery({
        maxWidth: '767px',
    });
    const isLaptop = useMediaQuery({
        maxWidth: '1023px',
    });

    return { isTablet, isLaptop, isMobile };
};

export default useResponsive;
