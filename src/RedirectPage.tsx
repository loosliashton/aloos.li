import { useEffect } from "react";
import { useParams } from "react-router-dom";

function RedirectPage() {
  let { shortUrl } = useParams();

  useEffect(() => {
    const getLongUrl = async () => {
      return `https://ashtonloosli.com/${shortUrl}`;
    };

    getLongUrl().then((longUrl) => {
      window.location.href = longUrl;
    })
  }, [shortUrl]);

  return <div>Redirecting...</div>
}

export default RedirectPage;