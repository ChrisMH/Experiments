
export namespace Util
{
    export class Equatable<TType>
    {
        equals(other: TType): boolean { return false; }
    }

    export function arraysEqual(left: Array<any>, right: Array<any>): boolean
    {
        if (!left && !right)
            return true;
        if (left && !right || !left && right)
            return false;

        if (left.length !== right.length)
            return false;

        for (let i = 0; i < left.length; i++)
        {
            // Check for nested arrays
            if (left[i] instanceof Array && right[i] instanceof Array)
            {
                if (!arraysEqual(left[i], right[i]))
                    return false;
            }
            if (left[i] instanceof Equatable && right[i] instanceof Equatable)
            {
                return left[i].equals(right[i]);
            }
            else if (left[i] !== right[i])
            {
                return false;
            }
        }

        return true;
    }

}