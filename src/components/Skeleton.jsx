import React from "react";

export default function Skeleton() {
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <ContentLoader
          speed={2}
          width={300}
          height={490}
          viewBox="0 0 300 490"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <circle cx="135" cy="125" r="120" />
          <rect x="0" y="310" rx="15" ry="15" width="280" height="90" />
          <rect x="0" y="422" rx="0" ry="0" width="90" height="30" />
          <rect x="130" y="415" rx="25" ry="25" width="144" height="50" />
          <rect x="10" y="265" rx="0" ry="0" width="260" height="20" />
        </ContentLoader>
      </div>
    </div>
  );
}
