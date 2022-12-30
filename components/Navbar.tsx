import Link from "next/link";

export default function Navbar( { }) {
    const username: string = null
 
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href='/'>
                        <button className="btn-logo">FEED</button>
                    </Link>
                </li>
                { username ? (
                    <>
                        <li className="push-left">
                            <Link href='/admin'>
                                <button className="btn-blue">Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href="user">
                                <img src="user.photoUrl"/>
                            </Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link href='/enter'>
                            <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                )}

            </ul>
        </nav>
    )
}