namespace TinadecTools.Tools.FileRW;



public static class FileHashing
{
    //来自 Github 上的 oh-my-openagent 的一些魔数
    public const uint PRIME32_1 = 0x9e3779b1;
    public const uint PRIME32_2 = 0x85ebca77;
    public const uint PRIME32_3 = 0xc2b2ae3d;
    public const uint PRIME32_4 = 0x27d4eb2f;
    public const uint PRIME32_5 = 0x165667b1;

    public static uint RotateLeft32(uint value, int bits)
    {
        bits %= 32;
        return (value << bits) | (value >> (32 - bits));
    }
}
