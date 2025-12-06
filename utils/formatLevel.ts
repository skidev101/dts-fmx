export const formatLevel = (level: string) => {
    switch (level) {
      case "L100":
        return { level: "100 lvl", colors: "border-blue-500 text-blue-400 bg-blue-100 dark:bg-blue-950" };

      case "L200":
        return { level: "200 lvl", colors: "border-green-500 text-green-400 bg-green-100 dark:bg-green-950" };

      case "L300":
        return { level: "300 lvl", colors: "border-red-500 text-red-400 bg-red-100 dark:bg-red-950" };

      case "L400":
        return { level: "400 lvl", colors: "border-purple-500 text-purple-400 bg-purple-100 dark:bg-purple-950" };
        
      case "L500":
        return { level: "500 lvl", colors: "border-orange-500 text-orange-400 bg-orange-100 dark:bg-orange-950" };

      default:
        return { level: "100 lvl", colors: "border-blue-500 text-blue-400 bg-gray-100 dark:bg-blue-950" };
    }
  };