/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
/**
 *
 * @author jojus1101
 */
public class apiFacade {
    private String key ="812371d51bmsh7b3a3c223132889p1b2420jsn9fa956b1a648";
    private String apiHost = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com";
//    public String getAllDataInParalelWithQueue() throws ProtocolException, IOException, InterruptedException, ExecutionException
//    {
//        ExecutorService workingJack = Executors.newCachedThreadPool();
//        List<Future<String>> futureList = new ArrayList();
//        for (int index = 1; index < 11; index++)
//        {
//            final int i = index;
//            Future<String> future = workingJack.submit(() -> getUserData(i));
//            futureList.add(future);
//        }
//        StringBuilder sb = new StringBuilder("[");
//        for (Future<String> future : futureList)
//        {
//            sb.append(future.get() + ",");
//        }
//        sb.append("]");
//        return sb.toString();
//
//    }

    public String getFlightPlaces(String place) throws MalformedURLException, ProtocolException, IOException
    {
        String staticUrl = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/DK/DKK/da-DK/?query=";
        String fullUrl = staticUrl + place;
        URL url = new URL(fullUrl);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Accept", "application/json;charset=UTF-8");
        con.setRequestProperty("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
        con.setRequestProperty("x-rapidapi-key","812371d51bmsh7b3a3c223132889p1b2420jsn9fa956b1a648" );
        try (Scanner scan = new Scanner(con.getInputStream()))
        {
            String jsonStr = "";
            while (scan.hasNext())
            {
                jsonStr += scan.nextLine();
            }
            return jsonStr;
        }
    }
    public String getFlightData(String origin, String destination, Date date) throws MalformedURLException, ProtocolException, IOException
    {
        String fullUrl = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/";
        String fullyBuild = fullUrl + "/" + origin + "/" + destination + "/" + date.toString();
        URL url = new URL(fullyBuild);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Accept", "application/json;charset=UTF-8");
        con.setRequestProperty("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
        con.setRequestProperty("x-rapidapi-key", "812371d51bmsh7b3a3c223132889p1b2420jsn9fa956b1a648");
        try (Scanner scan = new Scanner(con.getInputStream()))
        {
            String jsonStr = "";
            while (scan.hasNext())
            {
                jsonStr += scan.nextLine();
            }
            return jsonStr;
        }
    }

//    public static void main(String[] args) throws ProtocolException, IOException, InterruptedException, ExecutionException
//    {
////        apiFacade facade = new apiFacade();
////        String result = facade.getFlightData();
////        System.out.println(result);
//        index
//    }
}