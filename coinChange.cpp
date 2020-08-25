#include <iostream>
#include <vector>

using namespace std;

void noOfSteps(int);

int main()
{

    int n = 5;

    noOfSteps(n);

    return 0;
}

void noOfSteps(int n)
{
    if (n < 1)
    {
        cout << 0 << endl;
        return;
    }

    vector<int> dp(n + 1);

    dp[0] = 1;
    dp[1] = 1;

    for (int i = 2; i < n + 1; i++)
        dp[i] = dp[i - 1] + dp[i - 2];

    cout << dp[n] << endl;

    return;
}