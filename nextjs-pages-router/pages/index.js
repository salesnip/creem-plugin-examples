import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Script from "next/script";

export default function Home() {
  const router = useRouter();

  const [widgetLoading, setWidgetLoading] = useState(false);
  const [hostedLoading, setHostedLoading] = useState(false);

  const negotiate = useCallback(async (type) => {
    // Create a new negotiation session server-side
    const res = await fetch("/api/negotiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const session = await res.json();

    // Redirect to the negotation chat
    if (type === "HOSTED") router.push(session.url);
    // Open the cht in an embedded widget
    else if (type === "WIDGET") window.salesnip.open(session.id);
  }, []);

  return (
    <>
      {/* SaleSnip Snippet */}
      <Script>
        {`!function(e,n){if(!n.loaded){var t,a,r=n||{};for(r.__queue=[],(n=e.createElement("script")).type="text/javascript",n.async=!0,n.src="https://cdn.salesnip.com/v1/script.min.js",(o=e.getElementsByTagName("script")[0])?o.parentNode.insertBefore(n,o):e.head.appendChild(n),r.__handler=function(e){return function(){r.__queue.push([e].concat(Array.prototype.slice.call(arguments,0)))}},t="open on off".split(" "),a=0;a<t.length;a++){var i=t[a];r[i]=r.__handler(i)}var o=new Proxy(r,{get:function(e,n){return n in e||(e[n]=r.__handler(n)),e[n]}});window.salesnip=o,window.salesnip.loaded=1}}(document,window.salesnip||{});`}
      </Script>
      <div className="page">
        <div className="btn-box">
          <button
            onClick={async () => {
              setWidgetLoading(true);
              await negotiate("WIDGET");
              setWidgetLoading(false);
            }}
            className="btn-secondary"
          >
            {widgetLoading ? "Loading..." : "Negotiate (Widget)"}
          </button>
          <button
            onClick={async () => {
              setHostedLoading(true);
              await negotiate("HOSTED");
              setHostedLoading(false);
            }}
            className="btn-primary"
          >
            {hostedLoading ? "Loading..." : "Negotiate (Hosted)"}
          </button>
        </div>
      </div>
    </>
  );
}
