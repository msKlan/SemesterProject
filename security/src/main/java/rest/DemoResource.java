package rest;

import entities.User;
import facades.apiFacade;
import java.io.IOException;
import java.net.ProtocolException;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import utils.EMF_Creator;

/**
 * @author lam@cphbusiness.dk
 */
@Path("info")
public class DemoResource {

    private static EntityManagerFactory EMF = EMF_Creator.createEntityManagerFactory(EMF_Creator.DbSelector.DEV, EMF_Creator.Strategy.CREATE);
    private apiFacade api = new apiFacade();
    @Context
    private UriInfo context;

    @Context
    SecurityContext securityContext;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getInfoForAll() {
        return "{\"msg\":\"Hello anonymous\"}";
    }

    //Just to verify if the database is setup
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("all")
    public String allUsers() {

        EntityManager em = EMF.createEntityManager();
        try {
            List<User> users = em.createQuery("select user from User user").getResultList();
            return "[" + users.size() + "]";
        } finally {
            em.close();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("user")
    @RolesAllowed("user")
    public String getFromUser() {
        String thisuser = securityContext.getUserPrincipal().getName();
        return "{\"msg\": \"Hello to User: " + thisuser + "\"}";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("admin")
    @RolesAllowed("admin")
    public String getFromAdmin() {
        String thisuser = securityContext.getUserPrincipal().getName();
        return "{\"msg\": \"Hello to (admin) User: " + thisuser + "\"}";
    }
//    @GET
//    @Path("allflights")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getJsonPeopleList() throws InterruptedException, ExecutionException, ProtocolException, IOException {
//        return api.getFlightData();
//    }
    @GET
    @Path("place/{place}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getJsonPlaces(@PathParam("place") String place) throws ProtocolException, IOException{
        return api.getFlightPlaces(place);
    }
    
    @GET
    @Path("{origin}/{destination}/{date}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getJsonFlight(@PathParam("origin") String origin, @PathParam("destination") String destination, @PathParam("date") Date date) throws ProtocolException, IOException{
        return api.getFlightData(origin, destination, date);
    }
}
