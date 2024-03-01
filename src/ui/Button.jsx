import { Link } from "react-router-dom";

function Button({children, disabled, to, type, onClick}) {
    const base = 'text-sm bg-yellow-400 uppercase tracking-wide font-semibold text-stone-800 inline-block rounded-full hover:bg-yellow-300 duration-300 transition-color focus:outline-none focus:ring-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-offset-2 disabled:cursor-not-allowed';

    const styles= {
        primary: base + ' py-3 px-4 md:px-6 md:py-4',
        small: base + ' py-2 px-4 md:px-5 md:py-2.5 text-xs',
        secondary: 'text-sm py-2.5 px-4 md:px-6 md:py-3.5 border-2 border-stone-300 uppercase tracking-wide font-semibold text-stone-400 inline-block rounded-full hover:bg-stone-300 hover:text-stone-800 duration-300 transition-color focus:outline-none focus:ring-stone-200 focus:bg-stone-300 focus:ring focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed',
        round: base + ' py-1 px-2.5 md:px-3.5 md:py-2 text-sm',
    }

    if(to) {
        return ( 
            <Link to={to} className={styles[type]}>
                {children}
            </Link>
        );
    }
    if(onClick) {
        return (
            <button onClick={onClick} disabled={disabled} className={styles[type]}>
                {children}
            </button>
        )
    }


    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button
