import "core-js/es6";
import "core-js/es7/reflect";

if(process.env.ENV === "production")
{

}
else
{
    Error["stackTraceLimit"] = Infinity;
}
