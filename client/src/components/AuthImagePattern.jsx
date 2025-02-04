import { MessagesSquare } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 h-auto flex-col">
        <div className="max-w-md text-center flex flex-col justify-center items-center gap-y-4">
         <MessagesSquare size={144}/>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;