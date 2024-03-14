
import Link from 'next/link';
import {useRouter} from 'next/router'; 

const urlPath = ['Report', "Survivors", "Inventory"];
const Navigation: React.FC = () => {

  const router = useRouter();
  const { pathname } = router;  
  
  return(
    <nav>
      <ul className="flex gap-6 items-center">
        {urlPath.map((url: string) => {
          const asPath = `/${url.toLowerCase()}`;
          return (
            <li key={asPath}>              
              <Link 
                className={`px-[33px] py-[12px] rounded-md font-medium text-[14px] leading-[44px] text-white ${pathname === asPath ? 'bg-[#1F0D24]' : 'bg-none' }`}
                href={url.toLowerCase()}>
                  {url}
              </Link>
            </li>
          );
        })}        
      </ul>          
    </nav>
  )
}

export default Navigation;